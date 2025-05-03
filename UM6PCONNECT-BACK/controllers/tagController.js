const Tag = require("../models/Tag");

// ✅ Add a tag
exports.addTag = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.userId; // ✅ use req.userId (comes from token)

    if (!name) {
      return res.status(400).json({ message: "Tag name is required." });
    }

    const existingTag = await Tag.findOne({ userId, name });
    if (existingTag) {
      return res.status(400).json({ message: "Tag already exists." });
    }

    const newTag = new Tag({ userId, name });
    await newTag.save();

    res.status(201).json(newTag);
  } catch (error) {
    console.error("Error adding tag:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// ✅ Get all tags of a user
exports.getUserTags = async (req, res) => {
  try {
    const { userId } = req.params; // ok here, params is expected
    const tags = await Tag.find({ userId });

    res.status(200).json({ tags: tags.map(tag => tag.name) });
  } catch (error) {
    console.error("Error fetching user tags:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// ✅ Get all users by a tag
exports.getUsersByTag = async (req, res) => {
  try {
    const { tagName } = req.params;
    const usersWithTag = await Tag.find({ name: tagName }).populate("userId");

    if (!usersWithTag.length) {
      return res.status(404).json({ message: "No users found with this tag." });
    }

    res.status(200).json(usersWithTag.map(tag => tag.userId));
  } catch (error) {
    console.error("Error fetching users by tag:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// ✅ Get all tags (global)
exports.getAllTags = async (_req, res) => {
  try {
    const tags = await Tag.find();

    if (!tags.length) {
      return res.status(404).json({ message: "No tags found." });
    }

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching all tags:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// ✅ Delete a tag
exports.deleteTag = async (req, res) => {
  try {
    const userId = req.userId; // ✅ again take it from token
    const { tagName } = req.params;

    const deletedTag = await Tag.findOneAndDelete({ userId, name: tagName });

    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found." });
    }

    res.status(200).json({ message: "Tag deleted successfully." });
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
