// routes/signinRoutes.js
const express = require("express");
const { check } = require("express-validator");
const { handleSignin } = require("../controllers/signinController");

const router = express.Router();

router.post(
  "/",
  [
    check("email").isEmail().withMessage("Email invalide"),
    check("password").notEmpty().withMessage("Mot de passe requis"),
  ],
  handleSignin
);

module.exports = router;
