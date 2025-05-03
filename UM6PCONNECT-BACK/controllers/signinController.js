const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

exports.handleSignin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, keepSignedIn } = req.body; // ✅ get keepSignedIn from body

  try {
    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(400).json({ error: "Utilisateur non trouvé." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Identifiants invalides." });
    }

    // ✅ Set different expiry depending on checkbox
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: keepSignedIn ? "30d" : "24h" } // 30 days or 24 hours
    );

    res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: {
        _id: user._id,
        Email: user.Email,
        Prenom: user.Prenom,
        Nom: user.Nom,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};
