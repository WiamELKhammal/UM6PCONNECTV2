const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  Prenom: { type: String, required: true },
  Nom: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  telephone: { type: String },
  password: { type: String, required: false },
  
  role: { type: String, enum: ['postdoc', 'professeur'], required: true },
  Domaine: { type: String },  // Spécifique aux postdocs
  Universite: { type: String }, // Spécifique aux postdocs
  Pole: { type: String }, // Spécifique aux professeurs
  College: { type: String }, // Spécifique aux professeurs
  Departement: { type: String }, // Spécifique aux professeurs
  Nationalite: { type: String }, // Spécifique aux professeurs
  JobClassification: { type: String }, // Spécifique aux professeurs
  Status: { type: String, default: "Pending" }, // Appliqué aux deux rôles
  emailsent: { type: Boolean, default: false } ,// Suivi des emails envoyés
  hashedTemporaryPass: { type: String, required: false }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
