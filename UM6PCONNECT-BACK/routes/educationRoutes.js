const express = require("express");
const mongoose = require("mongoose");
const Education = require("../models/Education");
const router = express.Router();

// Ajouter une éducation pour un utilisateur spécifique
router.post("/", async (req, res) => {
  try {
    let { userId, schoolName, fieldOfStudy, startDate, endDate } = req.body;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }
    
    if (!userId || !schoolName || !fieldOfStudy || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert userId to ObjectId
    userId = new mongoose.Types.ObjectId(userId);

    const newEducation = new Education({ userId, schoolName, fieldOfStudy, startDate, endDate });
    await newEducation.save();
    
    res.status(201).json(newEducation);
  } catch (error) {
    console.error("Error saving education:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Récupérer les éducations par ID utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Convert userId to ObjectId
    const educations = await Education.find({ userId: new mongoose.Types.ObjectId(userId) });
    res.json(educations);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid education ID" });
      }
      const updatedEducation = await Education.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedEducation) {
        return res.status(404).json({ message: "Education not found" });
      }
      res.json(updatedEducation);
    } catch (error) {
      console.error("Error updating education:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  // Supprimer une éducation par ID
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Vérifier si l'ID est valide
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid education ID" });
      }
  
      // Supprimer l'éducation
      const deletedEducation = await Education.findByIdAndDelete(id);
      
      if (!deletedEducation) {
        return res.status(404).json({ message: "Education not found" });
      }
  
      res.status(200).json({ message: "Education deleted successfully" });
    } catch (error) {
      console.error("Error deleting education:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Vérifier si l'ID est valide
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid education ID" });
      }
  
      // Supprimer l'éducation par ID
      const deletedEducation = await Education.findByIdAndDelete(id);
      if (!deletedEducation) {
        return res.status(404).json({ message: "Education entry not found" });
      }
  
      res.json({ message: "Education entry deleted successfully" });
    } catch (error) {
      console.error("Error deleting education:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
