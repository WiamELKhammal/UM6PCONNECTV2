const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const experienceController = require("../controllers/experienceController");

// Authenticated routes
router.post("/", verifyToken, experienceController.addExperience);
router.put("/:id", verifyToken, experienceController.updateExperience);
router.delete("/:id", verifyToken, experienceController.deleteExperience);

// Public (or optionally protected) route
router.get("/:userId", experienceController.getExperience);

module.exports = router;
