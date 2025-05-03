const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  updateProfilePicture,
  updateCoverPicture,
} = require("../controllers/profilePictureController");

// ✅ Use JWT user ID (no need to send userId in URL)
router.post("/update-profile-picture", verifyToken, updateProfilePicture);
router.post("/update-cover-picture", verifyToken, updateCoverPicture);

module.exports = router;
