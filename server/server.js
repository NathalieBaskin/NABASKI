import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Anslut till databasen
const db = new sqlite3.Database("./nabaski.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database (nabaski.db).");
  }
});

// 📌 Skapa en bokning
app.post("/api/bookings", (req, res) => {
  console.log("Bokning mottagen:", req.body); // Logga inkommande data

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


// 📌 Hämta alla bokningar
app.get("/api/bookings", (req, res) => {
  db.all("SELECT * FROM bookings", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
