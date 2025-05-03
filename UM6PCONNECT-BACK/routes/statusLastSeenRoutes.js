// routes/statusLastSeenRoutes.js
const express = require("express");
const router = express.Router();
const redisClient = require("../utils/redisClient");
const verifyToken = require("../middleware/verifyToken"); // ✅ Import

// Secure this route with verifyToken middleware
router.get("/user-status/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  const isOnline = await redisClient.exists(`online:${userId}`);
  const lastSeen = await redisClient.get(`lastSeen:${userId}`);

  console.log("Checking status for:", userId);
  console.log("Redis online key:", await redisClient.get(`online:${userId}`));
  console.log("Redis lastSeen key:", await redisClient.get(`lastSeen:${userId}`));

  res.json({ isOnline: !!isOnline, lastSeen: lastSeen ? parseInt(lastSeen) : null });
});

module.exports = router;
