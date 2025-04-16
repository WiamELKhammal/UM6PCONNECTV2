const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Assuming you have a Message model
const User = require('../models/User');
// Send a new message
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { getUserStatus } = require("../utils/userStatus");

const multer = require("multer");
const extractLinks = require("../utils/extractLinks");

// ✅ Configure Multer for Handling File Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit


router.post("/send", upload.single("file"), async (req, res) => {
  try {
    const { senderId, receiverId, text = "" } = req.body;
    let files = [];

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Sender and receiver IDs are required." });
    }

    if (!text.trim() && !req.file && (!req.body.files || req.body.files.length === 0)) {
      return res.status(400).json({ error: "Message content cannot be empty." });
    }

    // ✅ Multer file
    if (req.file) {
      if (req.file.size > MAX_FILE_SIZE) {
        return res.status(400).json({ error: "File size exceeds 10MB. Please upload a smaller file." });
      }
      files.push({
        name: req.file.originalname,
        data: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        type: req.file.mimetype,
      });
    }

    // ✅ Base64 files
    if (req.body.files) {
      try {
        const parsedFiles = JSON.parse(req.body.files);
        parsedFiles.forEach((file) => {
          if (file.name && file.data && file.type) {
            const fileSize = Buffer.from(file.data, "base64").length;
            if (fileSize > MAX_FILE_SIZE) {
              return res.status(400).json({ error: "File size exceeds 10MB." });
            }
            files.push({
              name: file.name,
              data: file.data.startsWith("data:") ? file.data : `data:${file.type};base64,${file.data}`,
              type: file.type,
            });
          }
        });
      } catch (err) {
        return res.status(400).json({ error: "Invalid file format." });
      }
    }

    // ✅ Extract links
    const links = extractLinks(text);

    const message = new Message({
      senderId: new ObjectId(senderId),
      receiverId: new ObjectId(receiverId),
      text: text.trim(),
      isRead: false,
      files,
      links, // ✅ Store links
    });

    await message.save();

    res.status(200).json({
      message: "Message sent successfully!",
      data: {
        ...message.toObject(),
        senderId: message.senderId.toString(),
        receiverId: message.receiverId.toString(),
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send the message." });
  }
});

router.get("/conversation/:userId/:recipientId", async (req, res) => {
  const { userId, recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: new ObjectId(userId), receiverId: new ObjectId(recipientId), senderDeleted: false },
        { senderId: new ObjectId(recipientId), receiverId: new ObjectId(userId), receiverDeleted: false },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    // ✅ Ensure each file's `data` field has the correct format
    const formattedMessages = messages.map((msg) => ({
      ...msg,
      senderId: msg.senderId.toString(),
      receiverId: msg.receiverId.toString(),
      files: msg.files.map((file) => ({
        ...file,
        data: file.data.startsWith("data:") ? file.data : `data:${file.type};base64,${file.data}`,
      })),
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

router.get("/all-conversations/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    // ✅ Fetch messages that are NOT archived
    const messages = await Message.find({
      $or: [
        { senderId: new ObjectId(userId), senderDeleted: false, archived: false },
        { receiverId: new ObjectId(userId), receiverDeleted: false, archived: false },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    const userConversations = {};
    const userIdsToFetch = new Set();

    messages.forEach((msg) => {
      const contactId = msg.senderId.toString() === userId ? msg.receiverId : msg.senderId;

      // ✅ Skip conversations where all messages are deleted for the user
      if (
        (msg.senderId.toString() === userId && msg.senderDeleted) ||
        (msg.receiverId.toString() === userId && msg.receiverDeleted)
      ) {
        return; // Skip deleted conversations
      }

      if (!userConversations[contactId]) {
        userConversations[contactId] = { ...msg, unreadCount: 0 };
        userIdsToFetch.add(contactId);
      }

      if (!msg.isRead && msg.receiverId.toString() === userId) {
        userConversations[contactId].unreadCount += 1;
      }
    });

    const users = await User.find({ _id: { $in: Array.from(userIdsToFetch).map(id => new ObjectId(id)) } })
      .select("Nom Prenom profilePicture")
      .lean();

    const userMap = users.reduce((acc, user) => {
      acc[user._id.toString()] = user;
      return acc;
    }, {});

    const conversationsWithUserDetails = Object.values(userConversations).map((conv) => ({
      ...conv,
      contact: userMap[conv.senderId.toString() === userId ? conv.receiverId : conv.senderId] || null,
    }));

    res.status(200).json(conversationsWithUserDetails);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});
router.get("/archived/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const messages = await Message.find({
      $or: [{ senderId: userId, archived: true }, { receiverId: userId, archived: true }],
    })
      .sort({ createdAt: -1 })
      .lean();

    const userConversations = {};
    const userIdsToFetch = new Set();

    messages.forEach((msg) => {
      const contactId = msg.senderId.toString() === userId ? msg.receiverId : msg.senderId;
      if (!userConversations[contactId]) {
        userConversations[contactId] = { ...msg };
        userIdsToFetch.add(contactId);
      }
    });

    const users = await User.find({ _id: { $in: Array.from(userIdsToFetch).map(id => new ObjectId(id)) } })
      .select("Nom Prenom profilePicture")
      .lean();

    const userMap = users.reduce((acc, user) => {
      acc[user._id.toString()] = user;
      return acc;
    }, {});

    const conversationsWithUserDetails = Object.values(userConversations).map((conv) => ({
      ...conv,
      contact: userMap[conv.senderId.toString() === userId ? conv.receiverId : conv.senderId] || null,
    }));

    res.status(200).json(conversationsWithUserDetails);
  } catch (error) {
    console.error("Error fetching archived conversations:", error);
    res.status(500).json({ error: "Failed to fetch archived messages." });
  }
});

router.post("/delete", async (req, res) => {
  const { userId, contactId } = req.body;

  if (!userId || !contactId) {
    return res.status(400).json({ error: "Both userId and contactId are required." });
  }

  try {
    // ✅ Mark messages deleted for sender
    const senderUpdate = await Message.updateMany(
      { senderId: userId, receiverId: contactId },
      { $set: { senderDeleted: true } }
    );

    // ✅ Mark messages deleted for receiver
    const receiverUpdate = await Message.updateMany(
      { senderId: contactId, receiverId: userId },
      { $set: { receiverDeleted: true } }
    );

    // ✅ Delete messages permanently if BOTH users have deleted the chat
    await Message.deleteMany({
      $or: [
        { senderId: userId, receiverId: contactId, receiverDeleted: true },
        { senderId: contactId, receiverId: userId, senderDeleted: true },
      ],
    });

    res.status(200).json({
      message: "Chat deleted from your side only.",
      senderUpdated: senderUpdate.modifiedCount,
      receiverUpdated: receiverUpdate.modifiedCount,
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Failed to delete chat." });
  }
});

router.post("/archive", async (req, res) => {
  const { userId, contactId, archive } = req.body;

  if (!userId || !contactId) {
    return res.status(400).json({ error: "Both userId and contactId are required." });
  }

  try {
    // ✅ Update messages between the two users
    await Message.updateMany(
      {
        $or: [
          { senderId: userId, receiverId: contactId },
          { senderId: contactId, receiverId: userId },
        ],
      },
      { $set: { archived: archive } } // ✅ Archive or Unarchive
    );

    res.status(200).json({ message: archive ? "Chat archived successfully" : "Chat unarchived successfully" });
  } catch (error) {
    console.error("Error archiving chat:", error);
    res.status(500).json({ error: "Failed to archive chat" });
  }
});
router.get("/user-status/:id", async (req, res) => {
  const userId = req.params.id;
  const status = await getUserStatus(userId);
  res.json(status);
});
// Mark all messages from a specific contact as read
router.post("/mark-read", async (req, res) => {
  const { userId, contactId } = req.body;

  if (!userId || !contactId) {
    return res.status(400).json({ error: "userId and contactId are required" });
  }

  try {
    const result = await Message.updateMany(
      { senderId: contactId, receiverId: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ updated: result.modifiedCount });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ error: "Failed to update read status" });
  }
});
router.get("/files-between/:userId/:contactId", async (req, res) => {
  const { userId, contactId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: contactId },
        { senderId: contactId, receiverId: userId }
      ],
      $or: [
        { files: { $exists: true, $ne: [] } },
        { links: { $exists: true, $ne: [] } }
      ]
    })
    .sort({ createdAt: 1 })
    .lean();

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching shared files:", error);
    res.status(500).json({ error: "Failed to fetch shared files." });
  }
});



module.exports = router;

