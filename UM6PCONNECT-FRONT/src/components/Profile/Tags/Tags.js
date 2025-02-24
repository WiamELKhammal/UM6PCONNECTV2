import React, { useState } from "react";
import LabelIcon from "@mui/icons-material/Label";
import AddIcon from "@mui/icons-material/Add";
import AddTag from "./AddTag";
import {  Button } from "@mui/material";
const Tags = ({ initialTags = [], onSave }) => {
  const [selectedTags, setSelectedTags] = useState(initialTags);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle adding tags
  const handleAddTags = (newTags) => {
    setSelectedTags((prev) => [...prev, ...newTags]);
  };

  // Handle deleting a tag
  const handleDeleteTag = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  // Save changes
  const handleSave = () => {
    onSave(selectedTags); // Notify parent component of updated tags
  };

  return (
    <div
      className="box"
      style={{
        width: "90%",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
        position: "relative",
        border: "2px solid #ddd",
        borderRadius: "12px",
        backgroundClip: "padding-box",
        boxShadow: "none",
      }}
    >
      {/* Title and Add Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div>
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#444" }}>Tags</h4>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Add relevant tags to categorize your profile.
          </p>
        </div>
        <AddIcon
          onClick={() => setIsModalOpen(true)} // Open the AddTag modal
          style={{
            cursor: "pointer",
            color: "#d84b2b",
            border: "1px solid #d84b2b",
            borderRadius: "8px",
            padding: "5px",
            fontSize: "30px",
          }}
        />
      </div>

      {/* Display Selected Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: "#f5f5f5",
              color: "#444",
            }}
          >
            <span>{tag}</span>
            <button
              onClick={() => handleDeleteTag(tag)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#d84b2b",
                fontSize: "16px",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* AddTag Modal */}
      <AddTag
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTags={handleAddTags}
      />

      {/* Save Changes Button */}
      {selectedTags.length > 0 && (
        <Button
          variant="contained"
          onClick={handleSave}
          style={{
            marginTop: "20px",
            backgroundColor: "#d84b2b",
            color: "#fff",
            textTransform: "none",
            padding: "10px 20px",
          }}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default Tags;