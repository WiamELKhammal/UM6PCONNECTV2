const express = require("express");
const mongoose = require("mongoose");
const Experience = require("../models/Experience");

const router = express.Router();

// Ajouter une expérience
router.post("/", async (req, res) => {
  try {
    let { userId, companyName, jobTitle, startDate, endDate, description } = req.body;

    if (!userId || !companyName || !jobTitle || !startDate) {
      return res.status(400).json({ message: "userId, companyName, jobTitle et startDate sont obligatoires" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Vérifier si endDate est "Present" et la remplacer par null
    const formattedEndDate = endDate === "Present" ? null : endDate;

    // Vérifier si startDate et endDate sont des dates valides
    if (isNaN(Date.parse(startDate))) {
      return res.status(400).json({ message: "Invalid startDate format" });
    }

    if (formattedEndDate && isNaN(Date.parse(formattedEndDate))) {
      return res.status(400).json({ message: "Invalid endDate format" });
    }

    const newExperience = new Experience({ 
      userId: new mongoose.Types.ObjectId(userId),
      companyName, 
      jobTitle, 
      startDate: new Date(startDate),
      endDate: formattedEndDate ? new Date(formattedEndDate) : null,
      description 
    });

    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    console.error("Error saving experience:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Récupérer toutes les expériences d'un utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const experiences = await Experience.find({ userId: new mongoose.Types.ObjectId(userId) });

    // Formater les dates avant d'envoyer la réponse
    const formattedExperiences = experiences.map(exp => ({
      ...exp._doc,
      startDate: exp.startDate.toISOString().split("T")[0], // YYYY-MM-DD
      endDate: exp.endDate ? exp.endDate.toISOString().split("T")[0] : "Present"
    }));

    res.json(formattedExperiences);
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Mettre à jour une expérience par ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { startDate, endDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid experience ID" });
    }

    // Vérifier si endDate est "Present" et la remplacer par null
    const formattedEndDate = endDate === "Present" ? null : endDate;

    // Vérifier si startDate et endDate sont des dates valides
    if (startDate && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ message: "Invalid startDate format" });
    }

    if (formattedEndDate && isNaN(Date.parse(formattedEndDate))) {
      return res.status(400).json({ message: "Invalid endDate format" });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      {
        ...req.body,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: formattedEndDate ? new Date(formattedEndDate) : null
      },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(updatedExperience);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Supprimer une expérience par ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid experience ID" });
    }

    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
