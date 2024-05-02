const express = require("express");
const router = express.Router();

// Set Handlebars as the view engine
router.get("/", async (req, res) => {
  res.json({ message: "Hello world" });
});

module.exports = router;
