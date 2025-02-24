import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const EditBio = ({ open, onClose, onNext, onPrevious }) => {
  const [bio, setBio] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [wordCountError, setWordCountError] = useState(false);

  const handleBioChange = (event) => {
    const input = event.target.value;
    const wordCount = input.trim().split(/\s+/).length;

    // Check if the word count exceeds 200
    if (wordCount <= 200) {
      setBio(input);
      setWordCountError(false); // Reset error if within limit
    } else {
      setWordCountError(true); // Set error if word count exceeds 200
    }
  };



  const wordCount = bio.trim().split(/\s+/).length;

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "80%",
          maxWidth: "600px",
          margin: "3% auto",
          textAlign: "center",
          position: "relative",
          height: "auto",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "transparent",
            border: "none",
            color: "black",
            fontSize: "20px",
          }}
        >
          X
        </button>

        {/* Steps Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            paddingBottom: "10px",
            borderBottom: "2px solid #ddd",
          }}
        >
          Step 3: Edit Your Bio
        </div>

        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "30px" }}>
          Update Your Bio
        </h2>
        <p style={{ color: "#777", fontSize: "16px", marginBottom: "24px",textAlign: "left" }}>
          Tell others a bit about yourself.
        </p>

        {/* Bio Input Field */}
        <div style={{ position: "relative" }}>
          <TextField
            multiline
            rows={4}
            value={bio}
            onChange={handleBioChange}
            onFocus={() => setIsFocused(true)}  // Highlight border on focus
            onBlur={() => setIsFocused(false)}  // Remove highlight when focus is lost
            fullWidth
            placeholder="Write something about yourself..."
            variant="outlined"
            sx={{
              marginBottom: "20px",
              borderRadius: "8px",
              borderColor: isFocused ? "#d84b2b" : "transparent", // Red border on focus
            }}
          />
          {/* Word Count in Top Right */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: wordCountError ? "#777" : "#777",
              fontSize: "14px",
            }}
          >
            {wordCount} / 200
          </div>
        </div>

        {/* Error Message */}
        {wordCountError && (
          <div
            style={{
              color: "#d84b2b",
              fontSize: "14px",
              marginTop: "5px",
              textAlign: "left",
            }}
          >
            Error: Maximum word count exceeded!
          </div>
        )}

        {/* Buttons Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          {/* Previous Button */}
          <Button
            variant="contained"
            onClick={onPrevious}
            style={{ backgroundColor: "#d84b2b", color: "#fff", width: "20%" }}

          >
            Previous
          </Button>

          {/* Next Button */}
          <Button
            variant="contained"
            onClick={onNext}            
            style={{ backgroundColor: "#d84b2b", color: "#fff", width: "20%" }}

            disabled={wordCountError} // Disable Next button if error
          >
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditBio;
