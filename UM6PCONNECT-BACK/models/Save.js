const mongoose = require("mongoose");

const SaveSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  researcher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Save", SaveSchema);
