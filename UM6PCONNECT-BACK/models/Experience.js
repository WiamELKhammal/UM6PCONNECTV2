const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  companyLogo: { type: String }, // Ajout du champ pour le logo de l'entreprise
  jobTitle: { type: String, required: true },
  employmentType: { type: String }, // Type de contrat
  location: { type: String }, // Lieu
  industry: { type: String }, // Secteur d'activité
  website: { type: String }, // Lien vers le site web de l'entreprise
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null }, // Peut être null si l'utilisateur y travaille encore
  description: { type: String }
});

module.exports = mongoose.model("Experience", ExperienceSchema);
