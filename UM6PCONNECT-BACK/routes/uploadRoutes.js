// routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { updateProfilePicture } = require("../controllers/uploadController");

router.post("/", verifyToken, updateProfilePicture);

module.exports = router;
