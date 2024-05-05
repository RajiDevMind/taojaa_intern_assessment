const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Fetch all users from the database
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ order: [["id", "DESC"]] }); //descending order
    // render response with handlebars
    res.render("index.handlebars", { users, style: "index" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create-user", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
    });
    res.render("index.handlebars", { newUser, style: "index" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/update/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      // Render form with handlebars template engine
      res.render("editUser.handlebars", { user, style: "index" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email } = req.body;

  try {
    // Update the user with the provided ID
    const [affectedRowsCount, affectedRows] = await User.update(
      { firstName, lastName, email },
      { where: { id: id } }
    );

    if (affectedRowsCount > 0) {
      // If the user was successfully updated
      res
        .status(200)
        .json({ msg: "User updated successfully", user: affectedRows });
    } else {
      // If no user was found with the provided ID
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Find the user by ID and delete it
    const delUser = await User.destroy({ where: { id: id } });
    if (delUser) {
      return res.status(200).json({ msg: "Deleted successfully" });
    } else {
      // If user with the specified ID was not found
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
