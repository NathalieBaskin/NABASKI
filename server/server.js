import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Sätt upp __dirname för ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Servera statiska filer så att bilderna kan nås i frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================
// Bokningssystem (oförändrat)
// ==========================
const db = new sqlite3.Database("./nabaski.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database (nabaski.db).");
  }
});

app.post("/api/bookings", (req, res) => {
  console.log("Bokning mottagen:", req.body);

  const { firstName, lastName, email, photographyType, selectedPackage, price, date, message } = req.body;

  if (!firstName || !lastName || !email || !photographyType || !selectedPackage || !price || !date) {
    return res.status(400).json({ error: "Alla fält (förutom meddelande) måste vara ifyllda" });
  }

  const sql = `
    INSERT INTO bookings (first_name, last_name, email, photography_type, package, price, date, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [firstName, lastName, email, photographyType, selectedPackage, price, date, message || ""], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Bokning skapad!", bookingId: this.lastID });
  });
});

app.get("/api/bookings", (req, res) => {
  db.all("SELECT * FROM bookings", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ==========================
// Portfolio-funktionalitet
// ==========================

// Skapa tabellen för portfolio_images om den inte finns
db.run(`CREATE TABLE IF NOT EXISTS portfolio_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

// Skapa mappen för portfolio-bilder om den inte finns
const portfolioDir = path.join(__dirname, "uploads", "portfolio");
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true });
}

// Funktion för att normalisera kategorinamn (ersätter å, ä, ö med a, a, o)
const normalizeCategory = (category) => {
  return category.toLowerCase().replace(/å/g, "a").replace(/ä/g, "a").replace(/ö/g, "o");
};

// Konfigurera multer för att hantera bilduppladdning
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, portfolioDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB
  },
});

// POST: Ladda upp bilder till portfolio
app.post("/api/addPortfolioImages", upload.array("images", 10), (req, res) => {
  console.log("⚡ API-anrop mottaget: /api/addPortfolioImages");
  console.log("Kategori:", req.body.category);
  console.log("Namn:", req.body.name);

  if (!req.body.category || !req.body.name || !req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Kategori, namn och bilder måste anges" });
  }

  const category = req.body.category;
  const name = req.body.name;

  let insertedCount = 0;
  let errorOccurred = false;

  req.files.forEach((file) => {
    const filename = path.basename(file.path);
    const relativePath = `/uploads/portfolio/${filename}`;

    const sql = `INSERT INTO portfolio_images (category, name, image_url) VALUES (?, ?, ?)`;
    db.run(sql, [category, name, relativePath], function (err) {
      if (err) {
        errorOccurred = true;
        return res.status(500).json({ error: err.message });
      }
      insertedCount++;
      if (insertedCount === req.files.length && !errorOccurred) {
        res.status(200).json({ message: "Bilder uppladdade till portfolio!" });
      }
    });
  });
});

// GET: Hämta bilder från en specifik portfolio-kategori
app.get("/api/portfolio/:category", (req, res) => {
  let category = req.params.category.trim();
  category = normalizeCategory(category);
  console.log("🔍 Hämtar bilder för kategori:", category);

  const sql = "SELECT * FROM portfolio_images WHERE category = ?";
  db.all(sql, [category], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("📸 Bilder hittade:", rows);
    res.json(rows);
  });
});

// =================================
// SÖK: Hämta bilder baserat på namn
// =================================
app.get("/api/searchImages", (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : "";
  console.log("🔍 Söker efter bilder med namn:", query);

  const sql = "SELECT * FROM portfolio_images WHERE name LIKE ?";
  db.all(sql, [`%${query}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("📸 Sökträffar:", rows);
    res.json(rows);
  });
});

// DELETE: Ta bort en bild från portfolio
app.delete("/api/deletePortfolioImage/:imageId", (req, res) => {
  const { imageId } = req.params;
  const sql = "SELECT image_url FROM portfolio_images WHERE id = ?";
  db.get(sql, [imageId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Bild inte hittad" });
    }
    fs.unlink(path.join(__dirname, row.image_url), (err) => {
      if (err) {
        return res.status(500).json({ error: "Fel vid borttagning av bild från filsystemet" });
      }
      const deleteSql = "DELETE FROM portfolio_images WHERE id = ?";
      db.run(deleteSql, [imageId], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Bild raderad från portfolio!" });
      });
    });
  });
});

// ==========================
// Starta servern
// ==========================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
