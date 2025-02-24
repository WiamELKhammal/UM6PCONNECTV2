const express = require("express");
const { sendPasswordsToPendingUsers } = require("../controllers/authController"); // Assure-toi que le chemin est correct

const router = express.Router();

// Route pour envoyer les mots de passe aux professeurs en attente
router.post("/send-temp-passwords", sendPasswordsToPendingUsers);

module.exports = router;
