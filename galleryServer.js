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

// Filvägar
const uploadDir = path.join(__dirname, 'uploads');
const dbFile = path.resolve(__dirname, 'galleries.json');
const commentsFile = path.resolve(__dirname, 'comments.json');

// Skapa mappar och filer om de inte finns
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify([]));
if (!fs.existsSync(commentsFile)) fs.writeFileSync(commentsFile, JSON.stringify({}));

// Ladda gallerier från JSON-fil
const loadGalleries = () => {
  try {
    const data = fs.readFileSync(dbFile);
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Fel vid läsning av gallerier:", error);
    return [];
  }
};

// Spara gallerier till JSON-fil
const saveGalleries = (galleries) => {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(galleries, null, 2));
  } catch (error) {
    console.error("❌ Fel vid skrivning av gallerier:", error);
  }
};

// Ladda kommentarer och likes från JSON
const loadComments = () => {
  try {
    return JSON.parse(fs.readFileSync(commentsFile));
  } catch (error) {
    console.error("❌ Fel vid läsning av kommentarer:", error);
    return {};
  }
};

// Spara kommentarer och likes till JSON
const saveComments = (comments) => {
  try {
    fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
  } catch (error) {
    console.error("❌ Fel vid skrivning av kommentarer:", error);
  }
};

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

// Konfigurera Multer för filuppladdning
const upload = multer({ dest: uploadDir });

/* ============================================= */
/* 📷 Hämta alla gallerier */
/* ============================================= */
app.get('/api/galleries', (req, res) => {
  const galleries = loadGalleries();
  res.json({ galleries });
});

/* ============================================= */
/* 📂 Lägg till nytt galleri */
/* ============================================= */
app.post('/api/addGallery', upload.fields([
  { name: "representativeImage", maxCount: 1 },
  { name: "images", maxCount: 10 }
]), (req, res) => {
  const galleries = loadGalleries();
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "❌ Alla fält måste fyllas i." });
  }

  if (!req.files || !req.files["images"] || req.files["images"].length === 0) {
    return res.status(400).json({ error: "❌ Minst en bild krävs." });
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
  res.json({ message: '✅ Galleri tillagt!', gallery: newGallery });
});

/* ============================================= */
/* 🗑 Radera galleri */
/* ============================================= */
app.delete('/api/deleteGallery/:id', (req, res) => {
  let galleries = loadGalleries();
  const { id } = req.params;

  const galleryIndex = galleries.findIndex(g => g.id === parseInt(id));
  if (galleryIndex !== -1) {
    galleries.splice(galleryIndex, 1);
    saveGalleries(galleries);
    res.json({ message: '✅ Galleri raderat!' });
  } else {
    res.status(404).json({ message: '❌ Galleri inte hittat' });
  }
});

/* ============================================= */
/* 💬 Hämta kommentarer och likes för en bild */
/* ============================================= */
app.get('/api/comments/:image', (req, res) => {
  const comments = loadComments();
  res.json(comments[req.params.image] || { likes: 0, comments: [] });
});

/* ============================================= */
/* ❤️ Gilla en bild */
/* ============================================= */
app.post('/api/like/:image', (req, res) => {
  const comments = loadComments();
  if (!comments[req.params.image]) {
    comments[req.params.image] = { likes: 0, comments: [] };
  }
  comments[req.params.image].likes += 1;
  saveComments(comments);
  res.json(comments[req.params.image]);
});

/* ============================================= */
/* 📝 Lägg till en kommentar */
/* ============================================= */
app.post('/api/comment/:image', (req, res) => {
  const { name, text } = req.body;
  if (!name || !text) {
    return res.status(400).json({ error: "❌ Namn och kommentar krävs." });
  }

  const comments = loadComments();
  if (!comments[req.params.image]) {
    comments[req.params.image] = { likes: 0, comments: [] };
  }

  comments[req.params.image].comments.push({ name, text });
  saveComments(comments);
  res.json(comments[req.params.image]);
});
// Ta bort en kommentar för en specifik bild
app.delete('/api/deleteComment/:image', (req, res) => {
  const { image } = req.params;
  const { commentIndex } = req.body;  // Ta emot index för kommentaren som ska tas bort

  const comments = loadComments();
  if (comments[image] && comments[image].comments[commentIndex]) {
    comments[image].comments.splice(commentIndex, 1);  // Ta bort kommentaren från arrayen
    saveComments(comments);
    return res.json({ message: "Kommentar raderad!" });
  } else {
    return res.status(404).json({ error: "Kommentar inte funnen." });
  }
});

/* ============================================= */
/* 🚀 Starta servern */
/* ============================================= */
app.listen(PORT, () => {
  console.log(`✅ Servern körs på http://localhost:${PORT}`);
});
