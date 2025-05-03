// controllers/messageController.js
const Message = require("../models/Message");
const User = require("../models/User");
const extractLinks = require("../utils/extractLinks");
const { ObjectId } = require("mongoose").Types;
const CryptoJS = require("crypto-js");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;

// Encrypt text
const encryptText = (text) => {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_SECRET).toString();
};

// Decrypt text (optional for internal use)
const decryptText = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text = "" } = req.body;
    let files = [];

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Sender and receiver IDs are required." });
    }

    if (!text.trim() && !req.file && (!req.body.files || req.body.files.length === 0)) {
      return res.status(400).json({ error: "Message content cannot be empty." });
    }

    if (req.file) {
      if (req.file.size > MAX_FILE_SIZE) {
        return res.status(400).json({ error: "File size exceeds 10MB." });
      }
      files.push({
        name: req.file.originalname,
        data: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        type: req.file.mimetype,
      });
    }

    if (req.body.files) {
      try {
        const parsedFiles = JSON.parse(req.body.files);
        parsedFiles.forEach((file) => {
          const fileSize = Buffer.from(file.data, "base64").length;
          if (fileSize > MAX_FILE_SIZE) {
            return res.status(400).json({ error: "File size exceeds 10MB." });
          }
          files.push({
            name: file.name,
            data: file.data.startsWith("data:") ? file.data : `data:${file.type};base64,${file.data}`,
            type: file.type,
          });
        });
      } catch {
        return res.status(400).json({ error: "Invalid file format." });
      }
    }

    const links = extractLinks(text);

    const message = new Message({
      senderId: new ObjectId(senderId),
      receiverId: new ObjectId(receiverId),
      text: encryptText(text.trim()),
      isRead: false,
      files,
      links,
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
};

exports.getConversation = async (req, res) => {
  const { userId, recipientId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: recipientId, senderDeleted: false },
        { senderId: recipientId, receiverId: userId, receiverDeleted: false },
      ],
    }).sort({ createdAt: 1 });

    const formatted = messages.map((msg) => ({
      ...msg.toObject(),
      text: decryptText(msg.text),
      senderId: msg.senderId.toString(),
      receiverId: msg.receiverId.toString(),
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};

exports.getAllConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, senderDeleted: false, archived: false },
        { receiverId: userId, receiverDeleted: false, archived: false },
      ],
    }).sort({ createdAt: -1 });

    const userConversations = {};
    const userIdsToFetch = new Set();

    messages.forEach((msg) => {
      const contactId = msg.senderId.toString() === userId ? msg.receiverId : msg.senderId;
      if (!userConversations[contactId]) {
        userConversations[contactId] = { ...msg.toObject(), unreadCount: 0 };
        userIdsToFetch.add(contactId);
      }
      if (!msg.isRead && msg.receiverId.toString() === userId) {
        userConversations[contactId].unreadCount += 1;
      }
    });

    const users = await User.find({ _id: { $in: Array.from(userIdsToFetch) } }).select("Nom Prenom profilePicture");
    const userMap = users.reduce((acc, u) => {
      acc[u._id] = u;
      return acc;
    }, {});

    const results = Object.values(userConversations).map((conv) => ({
      ...conv,
      text: decryptText(conv.text),
      contact: userMap[conv.senderId.toString() === userId ? conv.receiverId : conv.senderId] || null,
    }));

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversations." });
  }
};

exports.archiveConversation = async (req, res) => {
    const { userId, contactId, archive } = req.body;
  
    try {
      await Message.updateMany(
        {
          $or: [
            { senderId: userId, receiverId: contactId },
            { senderId: contactId, receiverId: userId },
          ],
        },
        { $set: { archived: archive } }
      );
  
      res.status(200).json({
        message: archive
          ? "Chat archived successfully"
          : "Chat unarchived successfully",
      });
    } catch (error) {
      console.error("Error archiving chat:", error);
      res.status(500).json({ error: "Failed to archive chat" });
    }
  };
  exports.deleteConversation = async (req, res) => {
    const { userId, contactId } = req.body;
  
    try {
      const senderUpdate = await Message.updateMany(
        { senderId: userId, receiverId: contactId },
        { $set: { senderDeleted: true } }
      );
  
      const receiverUpdate = await Message.updateMany(
        { senderId: contactId, receiverId: userId },
        { $set: { receiverDeleted: true } }
      );
  
      // Physically delete if both sides have deleted
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
  };

  
  exports.getArchivedConversations = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const messages = await Message.find({
        $or: [
          { senderId: new ObjectId(userId), archived: true },
          { receiverId: new ObjectId(userId), archived: true },
        ],
      }).sort({ createdAt: -1 }).lean();
  
      const userConversations = {};
      const userIdsToFetch = new Set();
  
      messages.forEach((msg) => {
        const contactId = msg.senderId.toString() === userId ? msg.receiverId.toString() : msg.senderId.toString();
        if (!userConversations[contactId]) {
          userConversations[contactId] = { ...msg };
          userIdsToFetch.add(contactId);
        }
      });
  
      const users = await User.find({
        _id: { $in: Array.from(userIdsToFetch).map(id => new ObjectId(id)) }
      }).select("Nom Prenom profilePicture").lean();
  
      const userMap = users.reduce((acc, user) => {
        acc[user._id.toString()] = user;
        return acc;
      }, {});
  
      const conversations = Object.values(userConversations).map(conv => ({
        ...conv,
        contact: userMap[conv.senderId.toString() === userId ? conv.receiverId.toString() : conv.senderId.toString()] || null,
      }));
  
      res.status(200).json(conversations);
    } catch (error) {
      console.error("Error fetching archived conversations:", error);
      res.status(500).json({ error: "Failed to fetch archived messages." });
    }
  };
      

exports.markMessagesAsRead = async (req, res) => {
  const { userId, contactId } = req.body;
  try {
    const result = await Message.updateMany(
      { senderId: contactId, receiverId: userId, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).json({ updated: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to update read status." });
  }
};

exports.getSharedFiles = async (req, res) => {
  const { userId, contactId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: contactId },
        { senderId: contactId, receiverId: userId },
      ],
      $or: [
        { files: { $exists: true, $ne: [] } },
        { links: { $exists: true, $ne: [] } },
      ],
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shared files." });
  }
};

exports.getUserStatus = async (req, res) => {
  const { getUserStatus } = require("../utils/userStatus");
  const status = await getUserStatus(req.params.id);
  res.json(status);
};
