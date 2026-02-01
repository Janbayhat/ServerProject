const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbDir = path.join(__dirname, "../database");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "db.sqlite");
const db = new sqlite3.Database(dbPath);

db.run(`
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  video_id TEXT,
  title TEXT,
  thumbnail TEXT
)`);

exports.getByUser = (userId) =>
  new Promise((resolve) => {
    db.all(
      "SELECT * FROM favorites WHERE user_id=?",
      [userId],
      (err, rows) => resolve(rows)
    );
  });

exports.add = (userId, videoId, title, thumbnail) =>
  new Promise((resolve) => {
    db.run(
      "INSERT INTO favorites (user_id, video_id, title, thumbnail) VALUES (?,?,?,?)",
      [userId, videoId, title, thumbnail],
      () => resolve()
    );
  });

exports.remove = (id) =>
  new Promise((resolve) => {
    db.run("DELETE FROM favorites WHERE id=?", [id], () => resolve());
  });
