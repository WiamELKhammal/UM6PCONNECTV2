const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  journal: {
    type: String,
    required: true,
    trim: true
  },
  publicationDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Publication", PublicationSchema);
