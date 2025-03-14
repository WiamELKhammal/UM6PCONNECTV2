// routes/notification.js
const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// Get all notifications for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ recipientId: userId })
      .populate("senderId", "Prenom Nom profilePic") // Include sender details
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

// Mark a notification as read
router.put("/mark-as-read/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
});
// Get unread notifications count for the user
router.get('/unreadCount/:userId', async (req, res) => {
    try {
      const count = await Notification.countDocuments({ receiverId: req.params.userId, read: false });
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Error fetching unread notifications." });
    }
  });
  // Mark a notification as read
  router.put('/markAsRead/:notificationId', async (req, res) => {
    try {
      await Notification.updateOne({ _id: req.params.notificationId }, { $set: { read: true } });
      res.status(200).send("Notification marked as read.");
    } catch (error) {
      res.status(500).send("Error marking notification as read.");
    }
  });
  
// Mark all notifications as read
router.put('/markAllAsRead/:userId', async (req, res) => {
    try {
      await Notification.updateMany({ receiverId: req.params.userId, read: false }, { $set: { read: true } });
      res.status(200).send("All notifications marked as read.");
    } catch (error) {
      res.status(500).send("Error marking all notifications as read.");
    }
  });
  
module.exports = router;