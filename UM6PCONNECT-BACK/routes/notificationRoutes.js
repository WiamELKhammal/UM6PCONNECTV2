const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getAllNotifications,
  markNotificationAsRead,
  getUnreadCount,
  markAllAsRead,
} = require("../controllers/notificationController");

// ✅ Protected routes using verifyToken middleware
router.get("/", verifyToken, getAllNotifications);
router.put("/mark-as-read/:id", verifyToken, markNotificationAsRead);
router.get("/unreadCount", verifyToken, getUnreadCount);
router.put("/markAllAsRead", verifyToken, markAllAsRead);

module.exports = router;
