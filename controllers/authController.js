const User = require("../models/userModel");

exports.loginPage = (req, res) => res.render("login");

exports.registerPage = (req, res) => res.render("register");

exports.register = async (req, res) => {
  await User.create(req.body.username, req.body.password);
  res.redirect("/login");
};

exports.login = async (req, res) => {
  const user = await User.find(req.body.username, req.body.password);
  if (!user) return res.render("login", { error: "Invalid login" });
  req.session.user = user;
  res.redirect("/home");
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};

exports.home = (req, res) => {
  res.render("home", { user: req.session.user });
};
