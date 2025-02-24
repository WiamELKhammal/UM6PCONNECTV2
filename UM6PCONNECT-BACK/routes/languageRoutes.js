const express = require("express");
const mongoose = require("mongoose");
const Language = require("../models/Language");
const router = express.Router();

// Ajouter une langue pour un utilisateur spécifique
router.post("/", async (req, res) => {
    try {
      console.log("Request body:", req.body); // Log the incoming body
  
      let { userId, name, proficiency } = req.body;
  
      // Validate userId format
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId format" });
      }
  
      if (!userId || !name || !proficiency) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Proceed with saving the language
      const newLanguage = new Language({ userId, name, proficiency });
      await newLanguage.save();
      
      res.status(201).json(newLanguage);
    } catch (error) {
      console.error("Error saving language:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// Récupérer les langues par ID utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Convert userId to ObjectId
    const languages = await Language.find({ userId: new mongoose.Types.ObjectId(userId) });
    res.json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Mettre à jour une langue spécifique
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid language ID" });
    }
    const updatedLanguage = await Language.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedLanguage) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json(updatedLanguage);
  } catch (error) {
    console.error("Error updating language:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Supprimer une langue par ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid language ID" });
    }

    // Supprimer la langue
    const deletedLanguage = await Language.findByIdAndDelete(id);
    
    if (!deletedLanguage) {
      return res.status(404).json({ message: "Language not found" });
    }

    res.status(200).json({ message: "Language deleted successfully" });
  } catch (error) {
    console.error("Error deleting language:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
