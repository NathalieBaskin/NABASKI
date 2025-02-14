import sqlite3 from "sqlite3";
import { join } from "path";
import { open } from "sqlite";

// Funktion för att initiera databasen
async function initDB() {
  try {
    // eslint-disable-next-line no-undef
    const dbPath = join(process.cwd(), "db", "admin.db");

    // Använd sqlite3 med open
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database, // SQLite3 driver här
    });

    // Skapa tabellen om den inte finns
    await db.exec(`
      CREATE TABLE IF NOT EXISTS galleries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        password TEXT,
        images TEXT
      )
    `);

    console.log(" SQLite-databas initierad och redo att användas!");
    return db;
  } catch (error) {
    console.error(" Fel vid initiering av databasen:", error);
    // eslint-disable-next-line no-undef
    process.exit(1); // Avslutar servern om databasen inte initieras
  }
}

// Skapa och exportera en databasinstans
const dbPromise = initDB();

export async function run(query, params = []) {
  const db = await dbPromise;
  return db.run(query, params);
}

export async function get(query, params = []) {
  const db = await dbPromise;
  return db.get(query, params);
}

export async function all(query, params = []) {
  const db = await dbPromise;
  return db.all(query, params);
}

export default dbPromise;
