const mongoose = require("mongoose");

const User = require("../models/User");
const Experience = require("../models/Experience");

const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    const experiences = await Experience.find({ userId });

    let completedSections = 0;
    let missingFields = [];

    const requiredFields = [
      { key: "Prenom", label: "First Name" },
      { key: "Nom", label: "Last Name" },
      { key: "headline", label: "Headline" },
      { key: "profilePicture", label: "Profile Picture" },
      { key: "coverPicture", label: "Cover Picture" },
      { key: "Departement", label: "Departement" },
      { key: "linkedIn", label: "LinkedIn" },
      { key: "researchGate", label: "ResearchGate" },
    ];

    requiredFields.forEach(({ key, label }) => {
      if (!user[key] || user[key].trim() === "") {
        missingFields.push(label);
      } else {
        completedSections++;
      }
    });

    // Experience validation
    const isValidExperience = (exp) => exp.companyName && exp.jobTitle && exp.startDate;
    if (experiences && experiences.some(isValidExperience)) {
      completedSections++;
    } else {
      missingFields.push("Experience");
    }

    const totalSections = requiredFields.length + 1; // 8 fields + 1 experience
    const completionPercentage = ((completedSections / totalSections) * 100).toFixed(1);

    return {
      profile: user,
      completionPercentage,
      missingFields,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

module.exports = getUserProfile;
