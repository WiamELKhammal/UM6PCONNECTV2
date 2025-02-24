const express = require("express");
const License = require("../models/License");
const router = express.Router();

// Ajouter une licence
router.post("/", async (req, res) => {
  try {
    const { userId, licenseName, issuedBy, issueDate, expirationDate, description } = req.body;

    if (!userId || !licenseName || !issuedBy || !issueDate) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newLicense = new License({ userId, licenseName, issuedBy, issueDate, expirationDate, description });
    await newLicense.save();
    res.status(201).json(newLicense);
  } catch (error) {
    console.error("Error adding license:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Récupérer toutes les licences d'un utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const licenses = await License.find({ userId });
    res.status(200).json(licenses);
  } catch (error) {
    console.error("Error fetching licenses:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Mettre à jour une licence
router.put("/:licenseId", async (req, res) => {
  try {
    const { licenseId } = req.params;
    const updatedLicense = await License.findByIdAndUpdate(licenseId, req.body, { new: true });

    if (!updatedLicense) {
      return res.status(404).json({ message: "License not found." });
    }

    res.status(200).json(updatedLicense);
  } catch (error) {
    console.error("Error updating license:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Supprimer une licence
router.delete("/:licenseId", async (req, res) => {
  try {
    const { licenseId } = req.params;
    const deletedLicense = await License.findByIdAndDelete(licenseId);

    if (!deletedLicense) {
      return res.status(404).json({ message: "License not found." });
    }

    res.status(200).json({ message: "License deleted successfully." });
  } catch (error) {
    console.error("Error deleting license:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
