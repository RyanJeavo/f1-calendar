const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const DB_PATH =
  process.env.DATABASE_PATH || path.join(__dirname, "f1calendar.sqlite");

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to the SQLite database");
  }
});

app.get("/raceThisWeek", (req, res) => {
  db.all(
    `SELECT * FROM calendar
    WHERE date(race) BETWEEN 
      date('now', 'weekday 0', '-6 days')
      AND date('now', 'weekday 0')`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json(rows);
    }
  );
});

app.get("/nextRace", (req, res) => {
  db.all(
    `SELECT * FROM CALENDAR
    WHERE date(race) > date('now')
    LIMIT 1`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});
