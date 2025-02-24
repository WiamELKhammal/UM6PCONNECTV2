const express = require("express");
const { sendPasswordsToUnsentUsers } = require("../controllers/authController");

const router = express.Router();

router.post("/send-temp-passwords", sendPasswordsToUnsentUsers);

module.exports = router;
