const express = require("express");
const Save = require("../models/Save");
const router = express.Router();

// Save a researcher
router.post("/save", async (req, res) => {
  try {
    const { userId, researcherId } = req.body;

    // Check if already saved
    const existingSave = await Save.findOne({ user: userId, researcher: researcherId });
    if (existingSave) return res.status(400).json({ message: "Already saved" });

    // Create new save entry
    const newSave = new Save({ user: userId, researcher: researcherId });
    await newSave.save();

    res.json({ message: "Researcher saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving researcher", error });
  }
});

// Unsave a researcher
router.post("/unsave", async (req, res) => {
  try {
    const { userId, researcherId } = req.body;

    const deletedSave = await Save.findOneAndDelete({ user: userId, researcher: researcherId });
    if (!deletedSave) return res.status(404).json({ message: "Save entry not found" });

    res.json({ message: "Researcher unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unsaving researcher", error });
  }
});

// Get all saved researchers for a user
// Example backend code to fetch saved researchers with full details
router.get("/saved/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const savedResearchers = await Save.find({ user: userId })
      .populate("researcher", "Prenom Nom email profilePicture headline tags bio Departement") // Include all necessary fields
      .exec();

    res.json(savedResearchers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving saved researchers", error });
  }
});

module.exports = router;
