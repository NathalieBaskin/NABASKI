import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

// Skapa Express-applikation
const app = express();

// Aktivera CORS för alla ursprung
app.use(cors());

// Hantera __dirname i ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware för att läsa JSON
app.use(express.json());

// Ställ in statiska filer för bilder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // Justering här för bildernas åtkomstväg

// Setup multer för bilduppladdning
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));  // Bilder sparas här
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Skapa unika filnamn
  },
});

const upload = multer({ storage: storage });

// Dummy databas för gallerier
let galleries = [];

// API för att skapa ett nytt galleri
app.post("/api/addGallery", upload.array("images"), (req, res) => {
  const { name, password } = req.body;

  // Om ingen bild laddas upp
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "Ingen bild uppladdad." });
  }

  // Hämta alla bilder från uppladdade filer
  const images = req.files.map((file) => `/uploads/${file.filename}`);
  const representativeImage = images[0];  // Vi antar att den första bilden är representativ

  const newGallery = {
    id: galleries.length + 1,  // Unikt ID för varje galleri
    name,
    password,
    images,
    representativeImage,
  };

  galleries.push(newGallery);
  res.status(201).json({ message: "Galleri skapat", gallery: newGallery });
});

// API för att hämta alla gallerier
app.get("/api/galleries", (req, res) => {
  res.json({ galleries });  // Returnera gallerier som JSON
});

// API för att hämta ett specifikt galleri
// API för att hämta ett specifikt galleri
app.get("/api/getGallery/:id", (req, res) => {
  const gallery = galleries.find(g => g.id === parseInt(req.params.id));
  if (gallery) {
    res.json({ gallery });
  } else {
    res.status(404).json({ message: "Galleri inte hittat" });
  }
});


// API för att uppdatera galleri
app.put("/api/updateGallery/:id", upload.array("images"), (req, res) => {
  const { name, password, representativeImage } = req.body;
  const images = req.files.map((file) => `/uploads/${file.filename}`);

  const gallery = galleries.find((g) => g.id === parseInt(req.params.id));
  if (gallery) {
    gallery.name = name || gallery.name;
    gallery.password = password || gallery.password;
    gallery.representativeImage = representativeImage || gallery.representativeImage;
    gallery.images = images.length > 0 ? images : gallery.images;

    res.json({ message: "Galleri uppdaterat", gallery });
  } else {
    res.status(404).json({ message: "Galleri inte hittat" });
  }
});

// API för att ta bort galleri
app.delete("/api/deleteGallery/:id", (req, res) => {
  const { id } = req.params;
  const index = galleries.findIndex(gallery => gallery.id === parseInt(id));
  if (index !== -1) {
    galleries.splice(index, 1);  // Ta bort galleriet från arrayen
    res.json({ message: "Galleri raderat" });
  } else {
    res.status(404).json({ message: "Galleri inte hittat" });
  }
});

// Starta servern
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servern kör på port ${PORT}`);
});
