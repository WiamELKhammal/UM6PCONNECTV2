const Save = require("../models/Save");
const User = require("../models/User");

exports.saveResearcher = async (req, res) => {
  try {
    const userId = req.userId; 
    const { researcherId } = req.body;

    if (userId === researcherId) {
      return res.status(400).json({ message: "You cannot save yourself" });
    }

    const existingSave = await Save.findOne({ user: userId, researcher: researcherId });
    if (existingSave) return res.status(400).json({ message: "Already saved" });

    const newSave = new Save({ user: userId, researcher: researcherId });
    await newSave.save();

    await User.findByIdAndUpdate(researcherId, { $inc: { saveCount: 1 } });

    res.json({ message: "Researcher saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving researcher", error });
  }
};

exports.unsaveResearcher = async (req, res) => {
  try {
    const userId = req.userId; 
    const { researcherId } = req.body;

    const deletedSave = await Save.findOneAndDelete({ user: userId, researcher: researcherId });
    if (!deletedSave) return res.status(404).json({ message: "Save entry not found" });

    await User.findByIdAndUpdate(researcherId, { $inc: { saveCount: -1 } });

    res.json({ message: "Researcher unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unsaving researcher", error });
  }
};

exports.getSavedResearchers = async (req, res) => {
  try {
    const userId = req.userId; 

    const savedResearchers = await Save.find({ user: userId })
      .populate("researcher", "Prenom Nom email profilePicture headline tags bio Departement saveCount");

    res.json(savedResearchers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving saved researchers", error });
  }
};

exports.getSaveCount = async (req, res) => {
  try {
    const researcherId = req.params.researcherId;
    const researcher = await User.findById(researcherId).select("saveCount");

    if (!researcher) return res.status(404).json({ message: "Researcher not found" });

    res.json({ researcherId, saveCount: researcher.saveCount });
  } catch (error) {
    res.status(500).json({ message: "Error getting save count", error });
  }
};
