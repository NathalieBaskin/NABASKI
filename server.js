import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';  // Importera CORS

// Skapa Express-applikation
const app = express();

// Aktivera CORS för alla ursprung
app.use(cors());

// Hantera __dirname i ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Använd JSON middleware för att läsa JSON från inkommande request body
app.use(express.json());

// Ställ in statiska filer för bilder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // Ändrat till /uploads

// Setup multer för bilduppladdning
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));  // Här sparas bilderna i /uploads-mappen
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Ge filerna unika namn
  },
});
const upload = multer({ storage: storage });

// Dummy databas för gallerier
let galleries = [];

// API för att skapa nytt galleri (ladda upp bilder)
app.post("/api/addGallery", upload.array("images"), (req, res) => {
  const { name, password } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "Ingen bild uppladdad." });
  }

  const images = req.files.map((file) => `/uploads/${file.filename}`);  // Ändrad sökväg till /uploads

  const newGallery = {
    name,
    password,
    images,
  };

  galleries.push(newGallery);  // Lägg till det nya galleriet i vår "databas"
  res.status(201).json({ message: "Galleri skapat", gallery: newGallery });
});

// API för att hämta alla gallerier
app.get("/api/galleries", (req, res) => {
  res.json({ galleries });  // Returnera gallerier som JSON
});

// Starta servern
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servern kör på port ${PORT}`);
});
