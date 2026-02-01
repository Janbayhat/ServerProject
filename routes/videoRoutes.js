const express = require("express");
const router = express.Router();
const c = require("../controllers/videoController");

const auth = (req, res, next) =>
  req.session.user ? next() : res.redirect("/login");

router.get("/videos", auth, c.page);
router.get("/videos/search", auth, c.search);
router.post("/videos/add", auth, c.add);
router.get("/videos/delete/:id", auth, c.remove);

module.exports = router;
