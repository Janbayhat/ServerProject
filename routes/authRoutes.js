const express = require("express");
const router = express.Router();
const c = require("../controllers/authController");

router.get("/", (req, res) =>
  req.session.user ? res.redirect("/home") : res.redirect("/login")
);

router.get("/login", c.loginPage);
router.post("/login", c.login);
router.get("/register", c.registerPage);
router.post("/register", c.register);
router.get("/logout", c.logout);
router.get("/home", c.home);

module.exports = router;
