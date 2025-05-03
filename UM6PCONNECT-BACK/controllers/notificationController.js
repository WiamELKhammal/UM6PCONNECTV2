const Notification = require("../models/Notification");

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientId: req.userId }) // ✅ req.userId
      .populate("senderId", "Prenom Nom profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
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
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipientId: req.userId, // ✅ req.userId
      isRead: false,
    });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching unread notifications:", error);
    res.status(500).json({ error: "Error fetching unread notifications." });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipientId: req.userId, isRead: false }, // ✅ req.userId
      { $set: { isRead: true } }
    );
    res.status(200).send("All notifications marked as read.");
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).send("Error marking all notifications as read.");
  }
};
