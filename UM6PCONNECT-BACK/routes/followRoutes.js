const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  getFollowCount,
} = require("../controllers/followController");

// Protected
router.post("/follow", verifyToken, followUser);
router.post("/unfollow", verifyToken, unfollowUser);
router.get("/follow-count/:userId", verifyToken, getFollowCount);

// Public 
router.get("/following/:userId",verifyToken, getFollowing);
router.get("/followers/:userId",verifyToken, getFollowers);

module.exports = router;
