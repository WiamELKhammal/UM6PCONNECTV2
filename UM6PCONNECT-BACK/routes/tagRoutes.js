// routes/tagRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Tag = require("../models/Tag");
const verifyToken = require("../middleware/verifyToken");
const tagController = require("../controllers/tagController");

// Ajouter un tag pour un utilisateur
router.post("/", verifyToken, tagController.addTag);

// Récupérer tous les tags d'un utilisateur
router.get("/user/:userId", tagController.getUserTags);

// Récupérer les utilisateurs associés à un tag
router.get("/tag/:tagName", tagController.getUsersByTag);

// Récupérer tous les tags de tous les utilisateurs
router.get("/", tagController.getAllTags);

// Supprimer un tag d'un utilisateur
router.delete("/:userId/:tagName", verifyToken, tagController.deleteTag);

module.exports = router;
