const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createResearch,
  getUserResearch,
  updateResearch,
  deleteResearch
} = require("../controllers/researchController");

router.post("/", verifyToken, createResearch);
router.get("/user/:userId", getUserResearch);
router.put("/:id", verifyToken, updateResearch);
router.delete("/:id", verifyToken, deleteResearch);

module.exports = router;
