const express = require("express");
const router = express.Router();
const { registerPostdoc } = require("../controllers/postdocController");

router.post("/register", registerPostdoc);

module.exports = router;
