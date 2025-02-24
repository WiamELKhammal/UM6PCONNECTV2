const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null }, // Accepte null si l'utilisateur est encore en poste
  description: { type: String }
});

module.exports = mongoose.model("Experience", ExperienceSchema);
