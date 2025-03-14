const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
