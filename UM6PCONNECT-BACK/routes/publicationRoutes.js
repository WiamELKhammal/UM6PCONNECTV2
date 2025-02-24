const express = require("express");
const mongoose = require("mongoose");
const Publication = require("../models/Publication");

const router = express.Router();

// Ajouter une publication
router.post("/", async (req, res) => {
  try {
    let { userId, title, journal, publicationDate, description } = req.body;

    if (!userId || !title || !journal || !publicationDate) {
      return res.status(400).json({ message: "userId, title, journal et publicationDate sont obligatoires" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Vérifier si publicationDate est une date valide
    if (isNaN(Date.parse(publicationDate))) {
      return res.status(400).json({ message: "Invalid publicationDate format" });
    }

    const newPublication = new Publication({
      userId: new mongoose.Types.ObjectId(userId),
      title,
      journal,
      publicationDate: new Date(publicationDate),
      description
    });

    await newPublication.save();
    res.status(201).json(newPublication);
  } catch (error) {
    console.error("Error saving publication:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Récupérer toutes les publications d'un utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const publications = await Publication.find({ userId: new mongoose.Types.ObjectId(userId) });

    // Formater les dates avant d'envoyer la réponse
    const formattedPublications = publications.map(pub => ({
      ...pub._doc,
      publicationDate: pub.publicationDate.toISOString().split("T")[0] // YYYY-MM-DD
    }));

    res.json(formattedPublications);
  } catch (error) {
    console.error("Error fetching publications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Mettre à jour une publication par ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { publicationDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid publication ID" });
    }

    // Vérifier si publicationDate est une date valide
    if (publicationDate && isNaN(Date.parse(publicationDate))) {
      return res.status(400).json({ message: "Invalid publicationDate format" });
    }

    const updatedPublication = await Publication.findByIdAndUpdate(
      id,
      {
        ...req.body,
        publicationDate: publicationDate ? new Date(publicationDate) : undefined
      },
      { new: true }
    );

    if (!updatedPublication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    res.json(updatedPublication);
  } catch (error) {
    console.error("Error updating publication:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Supprimer une publication par ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid publication ID" });
    }

    const deletedPublication = await Publication.findByIdAndDelete(id);

    if (!deletedPublication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error("Error deleting publication:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
