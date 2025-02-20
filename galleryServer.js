import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Hantera __dirname i ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Skapa uppladdningsmapp om den inte finns
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Skapa databasfil om den inte finns
const dbFile = path.resolve(__dirname, 'galleries.json'); // FIXAR `dbFile` FEL
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify([]));
}

// Ladda gallerier från JSON-fil
const loadGalleries = () => {
  try {
    const data = fs.readFileSync(dbFile);
    return JSON.parse(data);
  } catch (error) {
    console.error("Fel vid läsning av fil:", error);
    return [];
  }
};

// Spara gallerier till JSON-fil
const saveGalleries = (galleries) => {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(galleries, null, 2));
  } catch (error) {
    console.error("Fel vid skrivning till fil:", error);
  }
};

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

// **Hämta alla gallerier**
app.get('/api/galleries', (req, res) => {
  const galleries = loadGalleries();
  res.json({ galleries });
});

// **Lägg till ett nytt galleri**
app.post('/api/addGallery', multer({ dest: uploadDir }).fields([
  { name: "representativeImage", maxCount: 1 },
  { name: "images", maxCount: 10 }
]), (req, res) => {
  const galleries = loadGalleries();

  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Alla fält måste fyllas i." });
  }

  if (!req.files || !req.files["images"] || req.files["images"].length === 0) {
    return res.status(400).json({ error: "Minst en bild krävs." });
  }

  const images = req.files["images"].map(file => `/uploads/${file.filename}`);
  const representativeImage = req.files["representativeImage"]
    ? `/uploads/${req.files["representativeImage"][0].filename}`
    : images[0];

  const newGallery = {
    id: galleries.length + 1,
    name,
    password,
    images,
    representativeImage
  };

  galleries.push(newGallery);
  saveGalleries(galleries);
  res.json({ message: 'Galleri tillagt!', gallery: newGallery });
});

// **Radera galleri**
app.delete('/api/deleteGallery/:id', (req, res) => {
  let galleries = loadGalleries();
  const { id } = req.params;

  const galleryIndex = galleries.findIndex(g => g.id === parseInt(id));
  if (galleryIndex !== -1) {
    galleries.splice(galleryIndex, 1);
    saveGalleries(galleries);
    res.json({ message: 'Galleri raderat!' });
  } else {
    res.status(404).json({ message: 'Galleri inte hittat' });
  }
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
