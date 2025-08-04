const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(
  "./f1calendar.sqlite",
  sqlite.OPEN_READONLY,
  (err) => {
    if (err) return console.error(err);
  }
);

app.use(bodyParser.json);
