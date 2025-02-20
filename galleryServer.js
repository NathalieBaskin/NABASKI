import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 5000;

// Hantera __dirname i ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

let galleries = [];

app.get('/api/galleries', (req, res) => {
  res.json({ galleries });
});

app.post('/api/addGallery', upload.fields([
  { name: "representativeImage", maxCount: 1 },
  { name: "images", maxCount: 50 }
]), (req, res) => {
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
  res.json({ message: 'Galleri tillagt!', gallery: newGallery });
});

app.get('/api/getGallery/:id', (req, res) => {
  const { id } = req.params;
  const gallery = galleries.find(g => g.id === parseInt(id));
  if (!gallery) return res.status(404).json({ message: 'Galleri inte hittat' });

  res.json({ 
    gallery: { 
      ...gallery, 
      images: gallery.images.filter(img => img !== gallery.representativeImage)
    } 
  });
});

app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
