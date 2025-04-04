const express = require("express");
const Save = require("../models/Save");
const User = require("../models/User"); // Required to update saveCount
const router = express.Router();

// Save a researcher
// Save a researcher
router.post("/save", async (req, res) => {
  try {
    const { userId, researcherId } = req.body;

    // Prevent self-save
    if (userId === researcherId) {
      return res.status(400).json({ message: "You cannot save yourself" });
    }

    // Check if already saved
    const existingSave = await Save.findOne({ user: userId, researcher: researcherId });
    if (existingSave) return res.status(400).json({ message: "Already saved" });

    // Create new save entry
    const newSave = new Save({ user: userId, researcher: researcherId });
    await newSave.save();

    // Increment the researcher's save count
    await User.findByIdAndUpdate(researcherId, { $inc: { saveCount: 1 } });

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

    // Decrement the researcher's save count
    await User.findByIdAndUpdate(researcherId, { $inc: { saveCount: -1 } });

    res.json({ message: "Researcher unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unsaving researcher", error });
  }
});

// Get all saved researchers for a user
router.get("/saved/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const savedResearchers = await Save.find({ user: userId })
      .populate("researcher", "Prenom Nom email profilePicture headline tags bio Departement saveCount")
      .exec();

    res.json(savedResearchers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving saved researchers", error });
  }
});

// Optional: Get save count for a specific researcher
router.get("/save-count/:researcherId", async (req, res) => {
  try {
    const researcherId = req.params.researcherId;
    const researcher = await User.findById(researcherId).select("saveCount");

    if (!researcher) return res.status(404).json({ message: "Researcher not found" });

    res.json({ researcherId, saveCount: researcher.saveCount });
  } catch (error) {
    res.status(500).json({ message: "Error getting save count", error });
  }
});

module.exports = router;
