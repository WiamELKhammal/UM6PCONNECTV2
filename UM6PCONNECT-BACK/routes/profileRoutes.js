const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getProfileById,
  updateProfile,
} = require("../controllers/profileController");

//  Secure route: fetch profile by ID
router.get("/:id", getProfileById);

//  Secure route: update profile (current user)
router.put("/update", verifyToken, updateProfile);

module.exports = router;
