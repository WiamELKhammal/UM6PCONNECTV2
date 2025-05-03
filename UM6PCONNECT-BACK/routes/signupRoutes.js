const express = require("express");
const { check } = require("express-validator");
const { handleSignup } = require("../controllers/signupController");

const router = express.Router();

router.post(
  "/",
  [
    check("Email")
      .isEmail()
      .withMessage("Email invalide")
      .matches(/@um6p\.ma$/)
      .withMessage("Seuls les emails @um6p.ma sont autorisés"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  ],
  handleSignup
);

module.exports = router;
