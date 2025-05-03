// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const verifyToken = require("../middleware/verifyToken");
const messageController = require("../controllers/messageController");

//  Configure Multer for Handling File Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

//  Rate Limiter: Limit to 10 messages per minute per IP
const messageLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: "Too many messages sent. Please wait a minute.",
});

//  Protected Routes with verifyToken
router.post("/send", verifyToken, messageLimiter, upload.single("file"), messageController.sendMessage);
router.get("/conversation/:userId/:recipientId", verifyToken, messageController.getConversation);
router.get("/all-conversations/:userId", verifyToken, messageController.getAllConversations);
router.get("/archived/:userId", verifyToken, messageController.getArchivedConversations);
router.post("/delete", verifyToken, messageController.deleteConversation);
router.post("/archive", verifyToken, messageController.archiveConversation);
router.post("/mark-read", verifyToken, messageController.markMessagesAsRead);
router.get("/files-between/:userId/:contactId", verifyToken, messageController.getSharedFiles);
router.get("/user-status/:id",verifyToken, messageController.getUserStatus); // 

module.exports = router;
