const mongoose = require("mongoose");


const LanguageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // updated field name
  proficiency: { type: String, required: true }, // updated field name
});

module.exports = mongoose.model("Language", LanguageSchema);
