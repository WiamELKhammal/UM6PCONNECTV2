import React, { useState, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const AddTag = ({ open, onClose, onAddTags }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState("");

  // Fetch tags from tags.json
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/Tags.json");
        if (!response.ok) throw new Error("Failed to fetch tags.");
        const data = await response.json();
        setAvailableTags(data.map((tag) => tag.name)); // Extract tag names
      } catch (error) {
        console.error("Error fetching tags:", error);
        setError("Failed to load tags. Please try again later.");
      }
    };
    fetchTags();
  }, []);

  // Handle tag selection
  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag)); // Remove tag if already selected
    } else if (selectedTags.length < 4) {
      setSelectedTags([...selectedTags, tag]); // Add tag if not already selected
    } else {
      setError("You can only select up to 4 tags.");
    }
  };

  // Handle saving tags
  const handleSave = () => {
    if (selectedTags.length === 0) {
      setError("Please select at least one tag.");
      return;
    }
    onAddTags(selectedTags); // Pass selected tags to parent component
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Tags</DialogTitle>
      <DialogContent dividers>
        <p style={{ marginBottom: "16px" }}>Select up to 4 tags to categorize your profile:</p>

        {/* Display available tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "contained" : "outlined"}
              onClick={() => handleTagSelect(tag)}
              style={{
                backgroundColor: selectedTags.includes(tag) ? "#ea3b15" : "transparent",
                color: selectedTags.includes(tag) ? "#fff" : "#444",
                textTransform: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                transition: "background-color 0.3s ease",
                boxShadow: "none",

              }}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Error message */}
        {error && <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>
          Cancel
        </Button>
        <Button onClick={handleSave} style={{ backgroundColor: "#ea3b15", color: "#fff" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTag;