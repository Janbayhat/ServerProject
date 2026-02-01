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
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

exports.create = async (username, password) => {
  const hash = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      err => (err ? reject(err) : resolve())
    );
  });
};

exports.find = (username, password) =>
  new Promise((resolve) => {
    db.get(
      "SELECT * FROM users WHERE username=?",
      [username],
      async (err, user) => {
        if (!user) return resolve(null);
        const ok = await bcrypt.compare(password, user.password);
        resolve(ok ? user : null);
      }
    );
  });
