const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Route to fetch all users
router.get("/", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll();

    res.json(users); // Sending the retrieved users as a JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
    });
    res.json(newUser); // Sending the newly created user as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update", async (req, res) => {
  res.json({ message: "Hello world" });
});

router.delete("/delete", async (req, res) => {
  res.json({ message: "Hello world" });
});

module.exports = router;
