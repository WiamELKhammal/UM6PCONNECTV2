const express = require("express");
const mongoose = require("mongoose");
const Tag = require("../models/Tag");
const router = express.Router();

// Ajouter un tag pour un utilisateur
router.post("/", async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ message: "UserId and Tag name are required." });
    }

    // Check if the tag already exists for this user
    const existingTag = await Tag.findOne({ userId, name });
    if (existingTag) {
      return res.status(400).json({ message: "Tag already exists for this user." });
    }

    const newTag = new Tag({ userId, name });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.error("Error adding tag:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Récupérer tous les tags d'un utilisateur
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tags = await Tag.find({ userId });

    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: "No tags found for this user." });
    }

    res.status(200).json(tags); // Return the list of tag objects
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
router.get("/tag/:tagName", async (req, res) => {
  try {
    const { tagName } = req.params;
    const usersWithTag = await Tag.find({ name: tagName }).populate('userId');  // Assuming 'userId' field is populated

    if (!usersWithTag || usersWithTag.length === 0) {
      return res.status(404).json({ message: "No users found with this tag." });
    }

    res.status(200).json(usersWithTag.map(tag => tag.userId));  // Send back the list of users with the tag
  } catch (error) {
    console.error("Error fetching users with tag:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//  Récupérer tous les tags de tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();

    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: "No tags found." });
    }

    res.status(200).json(tags); // Return all tags from the database
  } catch (error) {
    console.error("Error fetching all tags:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Supprimer un tag d'un utilisateur
router.delete("/:userId/:tagName", async (req, res) => {
  try {
    const { userId, tagName } = req.params;

    // Delete the tag by name and userId
    const deletedTag = await Tag.findOneAndDelete({ userId, name: tagName });

    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found." });
    }

    res.status(200).json({ message: "Tag deleted successfully." });
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
