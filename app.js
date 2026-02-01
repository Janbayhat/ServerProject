const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    store: new SQLiteStore({ db: "sessions.sqlite" }),
    secret: "secret123",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/", authRoutes);
app.use("/", videoRoutes);

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
