import express from "express";
import cors from "cors";
import multer from "multer";
import { run, get, all } from "./db/utilities/db.js"; // Uppdaterad filväg

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Servera uppladdade bilder

// 📌 Multer-konfiguration för bilduppladdning
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// 📌 API: Hämta alla gallerier (utan lösenord)
app.get("/api/galleries", async (req, res) => {
  try {
    const galleries = await all("SELECT id, name FROM galleries");
    res.json({ galleries });
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta gallerier.", details: err.message });
  }
});

// 📌 API: Skapa nytt galleri
app.post("/api/addGallery", async (req, res) => {
  const { name, password } = req.body;

  console.log("⏳ Försöker skapa galleri:", req.body);

  try {
    await run("INSERT INTO galleries (name, password, images) VALUES (?, ?, ?)", [
      name,
      password,
      JSON.stringify([]),
    ]);
    console.log("✅ Galleri skapat:", name);
    res.json({ message: "Galleri skapat!", gallery: { name } });
  } catch (err) {
    console.error("❌ Fel vid insättning i databasen:", err.message);
    res.status(500).json({ error: "Galleri kunde inte skapas.", details: err.message });
  }
});

// 📌 API: Ladda upp bild till galleri
app.post("/api/upload/:gallery", upload.single("image"), async (req, res) => {
  const galleryName = req.params.gallery;
  const imagePath = `/uploads/${req.file.filename}`; // Korrekt bildsökväg

  console.log("📂 Uppladdning till galleri:", galleryName);
  console.log("🖼️ Uppladdad fil:", req.file);

  try {
    const row = await get("SELECT * FROM galleries WHERE name = ?", [galleryName]);
    if (!row) {
      return res.status(404).json({ error: "Galleri hittades inte." });
    }

    let images = JSON.parse(row.images);
    images.push(imagePath);

    await run("UPDATE galleries SET images = ? WHERE name = ?", [JSON.stringify(images), galleryName]);

    console.log("✅ Bild sparad i galleri:", galleryName);
    res.json({ message: "Bild uppladdad!", imagePath });
  } catch (err) {
    console.error("❌ Fel vid bilduppladdning:", err.message);
    res.status(500).json({ error: "Misslyckades med att spara bilden.", details: err.message });
  }
});

// 📌 API: Hämta ett galleri (lösenord krävs)
app.post("/api/getGallery", async (req, res) => {
  const { name, password } = req.body;
  console.log("🔍 Försöker hämta galleri:", name);

  try {
    const gallery = await get("SELECT * FROM galleries WHERE name = ? AND password = ?", [name, password]);

    if (!gallery) {
      return res.status(401).json({ error: "Fel lösenord eller galleri finns inte." });
    }

    console.log("✅ Galleri hittat:", gallery);
    res.json({ gallery });
  } catch (err) {
    console.error("❌ Kunde inte hämta galleriet:", err.message);
    res.status(500).json({ error: "Kunde inte hämta galleriet.", details: err.message });
  }
});

// 📌 API: Uppdatera galleri (ändra namn, lösenord eller bilder)
app.put("/api/updateGallery", async (req, res) => {
  const { id, name, password, images } = req.body;

  try {
    await run("UPDATE galleries SET name = ?, password = ?, images = ? WHERE id = ?", [
      name,
      password,
      JSON.stringify(images),
      id,
    ]);
    res.json({ message: "Galleri uppdaterat!" });
  } catch (err) {
    res.status(500).json({ error: "Misslyckades med att uppdatera galleriet.", details: err.message });
  }
});

// 📌 API: Ta bort galleri
app.delete("/api/deleteGallery/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await run("DELETE FROM galleries WHERE id = ?", [id]);
    res.json({ message: "Galleri raderat!" });
  } catch (err) {
    res.status(500).json({ error: "Misslyckades med att radera galleriet.", details: err.message });
  }
});
app.post("/api/addGallery", async (req, res) => {
    console.log("⏳ Inkommande data:", req.body); // Loggar inkommande data
  
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ error: "Både namn och lösenord måste anges." });
    }
  
    try {
      await run("INSERT INTO galleries (name, password, images) VALUES (?, ?, ?)", [
        name,
        password,
        JSON.stringify([]),
      ]);
      console.log("✅ Galleri skapat:", name);
  
      res.json({ message: "Galleri skapat!", gallery: { name } });
    } catch (err) {
      console.error("❌ Fel vid insättning i databasen:", err.message);
      res.status(500).json({ error: "Galleri kunde inte skapas.", details: err.message });
    }
  });
  

// Starta servern
app.listen(PORT, () => {
  console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});
