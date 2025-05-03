const Experience = require("../models/Experience");
const mongoose = require("mongoose");

exports.addExperience = async (req, res) => {
  try {
    const {
      companyName,
      
      jobTitle,
      startDate,
      endDate,
      description,
      employmentType,
      location,
      industry,
      website,
      companyLogo,
    } = req.body;

    const userId = req.userId; // extracted by verifyToken

    if (!companyName || !jobTitle || !startDate) {
      return res.status(400).json({ message: "companyName, jobTitle, and startDate are required" });
    }

    const formattedEndDate = endDate === "Present" ? null : endDate;

    const newExperience = new Experience({
      userId,
      companyName,
      jobTitle,
      startDate: new Date(startDate),
      endDate: formattedEndDate ? new Date(formattedEndDate) : null,
      description,
      employmentType,
      location,
      industry,
      website,
      companyLogo,
    });

    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    console.error("Error saving experience:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExperience = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const experiences = await Experience.find({ userId });

    const formatted = experiences.map(exp => ({
      ...exp._doc,
      startDate: exp.startDate.toISOString().split("T")[0],
      endDate: exp.endDate ? exp.endDate.toISOString().split("T")[0] : "Present",
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    let { startDate, endDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid experience ID" });
    }

    const formattedEndDate = endDate === "Present" ? null : endDate;

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      {
        ...req.body,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: formattedEndDate ? new Date(formattedEndDate) : null,
      },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(updatedExperience);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid experience ID" });
    }

    const deleted = await Experience.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Server error" });
  }
};
