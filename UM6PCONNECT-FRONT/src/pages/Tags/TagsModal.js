import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mui/material";

const TagsModal = ({ isOpen, onClose, onAddTags, selectedTags }) => {
  const [availableTags, setAvailableTags] = useState([]);

  // Fetch tags from tags.json
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/tags.json"); // Adjust the path to your tags.json file
        const data = await response.json();
        setAvailableTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      onAddTags([tag]); // Pass the selected tag to the parent component
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "3% auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "24px" }}>
          Select Up to 4 Tags
        </h2>
        <p style={{ color: "#777", fontSize: "16px", marginBottom: "20px" }}>
          Choose tags that best describe your skills or interests.
        </p>

        {/* Tag List */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {availableTags.map((tag) => (
            <div
              key={tag.id}
              onClick={() => handleTagSelect(tag.name)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px",
                borderRadius: "20px",
                backgroundColor: selectedTags.includes(tag.name) ? "#ea3b15" : "#f5f5f5",
                color: selectedTags.includes(tag.name) ? "#fff" : "#444",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>

        {/* Close Button */}
        <Button
          variant="contained"
          onClick={onClose}
          style={{
            marginTop: "20px",
            backgroundColor: "#ea3b15",
            color: "#fff",
            textTransform: "none",
          }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default TagsModal;