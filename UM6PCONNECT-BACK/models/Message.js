const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    links: { type: [String], default: [] },
    archived: { type: Boolean, default: false },
    senderDeleted: { type: Boolean, default: false },  
    receiverDeleted: { type: Boolean, default: false }, 
    files: [
      {
        name: {
          type: String,
          required: true,
        },
        data: {
          type: String, // Base64-encoded string
          required: true,
        },
        type: {
          type: String, // MIME type (e.g., "image/jpeg", "application/pdf")
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);