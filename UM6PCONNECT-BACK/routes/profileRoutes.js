const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");

// Mettre à jour le profil utilisateur
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si l'ID est défini et valide
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID utilisateur invalide" });
        }

        const updates = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Mise à jour des champs envoyés
        Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined) {
                user[key] = updates[key];
            }
        });

        await user.save();
        res.status(200).json({ message: "Profil mis à jour avec succès", user });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});
// Fetch user profile by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Fetch user profile
        const user = await User.findById(id).select("-password"); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
