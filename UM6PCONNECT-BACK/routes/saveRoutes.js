const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const saveController = require("../controllers/saveController");

// Secured routes
router.post("/save", verifyToken, saveController.saveResearcher);
router.post("/unsave", verifyToken, saveController.unsaveResearcher);
router.get("/saved", verifyToken, saveController.getSavedResearchers);

// Public or optional protection
router.get("/save-count/:researcherId", saveController.getSaveCount);

module.exports = router;
