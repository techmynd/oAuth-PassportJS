const express = require("express");
const router = express.Router();

// get register page
router.get("/register", function(req, res) {
  res.render("register");
});

// login page
router.get("/login", function(req, res) {
  res.render("login");
});

module.exports = router;
