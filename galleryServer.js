import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import imageCompression from 'browser-image-compression'; 
import { Buffer } from 'node:buffer'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;


const uploadDir = path.join(__dirname, 'uploads');
const dbFile = path.resolve(__dirname, 'galleries.json');
const commentsFile = path.resolve(__dirname, 'comments.json');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify([]));
if (!fs.existsSync(commentsFile)) fs.writeFileSync(commentsFile, JSON.stringify({}));

const loadGalleries = () => {
  try {
    const data = fs.readFileSync(dbFile);
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Fel vid läsning av gallerier:", error);
    return [];
  }
};


const saveGalleries = (galleries) => {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(galleries, null, 2));
  } catch (error) {
    console.error("❌ Fel vid skrivning av gallerier:", error);
  }
};


const loadComments = () => {
  try {
    return JSON.parse(fs.readFileSync(commentsFile));
  } catch (error) {
    console.error("❌ Fel vid läsning av kommentarer:", error);
    return {};
  }
};


const saveComments = (comments) => {
  try {
    fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
  } catch (error) {
    console.error("❌ Fel vid skrivning av kommentarer:", error);
  }
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024, 
  }
});


const compressImage = async (imagePath) => {
    try {
        const imageFile = fs.readFileSync(imagePath);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        const compressedFile = await imageCompression(new File([imageFile], "compressed.jpg"), options);
        const buffer = Buffer.from(await compressedFile.arrayBuffer()); 
        fs.writeFileSync(imagePath, buffer); 
    } catch (error) {
        console.error("Fel vid komprimering av bild:", error);
    }
};


app.get('/api/galleries', (req, res) => {
  const galleries = loadGalleries();
  res.json({ galleries });
});


app.post('/api/addGallery', upload.fields([
  { name: "representativeImage", maxCount: 1 },
  { name: "images", maxCount: 10 }
]), async (req, res) => {
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


  for (const file of req.files["images"]) {
    await compressImage(path.join(uploadDir, file.filename));
  }
  if (req.files["representativeImage"] && req.files["representativeImage"][0]) {
    await compressImage(path.join(uploadDir, req.files["representativeImage"][0].filename));
  }

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
app.get("/api/getUniqueNames", async (req, res) => {
  console.log("GET /api/getUniqueNames called");
  try {
      const galleries = loadGalleries();
      const names = galleries.map(g => g.name); 
      const uniqueNames = [...new Set(names)]; 
      console.log("Fetched unique names:", uniqueNames);
      res.json({ names: uniqueNames });
  } catch (error) {
      console.error("Error fetching names:", error);
      res.status(500).json({ error: "Server error" });
  }
});
app.put("/api/updateGallery/:id", upload.fields([
  { name: "representativeImage", maxCount: 1 },
  { name: "images", maxCount: 10 }
]), async (req, res) => {
  const galleries = loadGalleries();
  const { id } = req.params;
  const { name, password } = req.body;

  const galleryIndex = galleries.findIndex(g => g.id === parseInt(id));
  if (galleryIndex === -1) {
    return res.status(404).json({ error: "❌ Galleri inte hittat." });
  }

  if (!name || !password) {
    return res.status(400).json({ error: "❌ Alla fält måste fyllas i." });
  }

  const existingGallery = galleries[galleryIndex];

  const images = req.files["images"]
    ? req.files["images"].map(file => `/uploads/${file.filename}`)
    : existingGallery.images;

  const representativeImage = req.files["representativeImage"]
    ? `/uploads/${req.files["representativeImage"][0].filename}`
    : existingGallery.representativeImage;

  galleries[galleryIndex] = { ...existingGallery, name, password, images, representativeImage };
  saveGalleries(galleries);
  
  res.json({ message: "✅ Galleri uppdaterat!", gallery: galleries[galleryIndex] });
});



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


app.get('/api/comments/:image', (req, res) => {
  const comments = loadComments();
  res.json(comments[req.params.image] || { likes: 0, comments: [] });
});

app.post('/api/like/:image', (req, res) => {
  const comments = loadComments();
  if (!comments[req.params.image]) {
    comments[req.params.image] = { likes: 0, comments: [] };
  }
  comments[req.params.image].likes += 1;
  saveComments(comments);
  res.json(comments[req.params.image]);
});


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

app.delete('/api/deleteComment/:image', (req, res) => {
  const { image } = req.params;
  const { commentIndex } = req.body;  

  const comments = loadComments();
  if (comments[image] && comments[image].comments[commentIndex]) {
    comments[image].comments.splice(commentIndex, 1);  
    saveComments(comments);
    return res.json({ message: "Kommentar raderad!" });
  } else {
    return res.status(404).json({ error: "Kommentar inte funnen." });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Servern körs på http://localhost:${PORT}`);
});
