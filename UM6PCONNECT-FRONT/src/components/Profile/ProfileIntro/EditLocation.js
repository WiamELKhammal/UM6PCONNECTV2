import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";

const EditLocation = ({ onNext, onPrevious }) => {
  const [location, setLocation] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <Modal open={true}>
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
          onClick={() => {}}
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
          Step 4: Edit Your Location
        </div>

        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "30px" }}>
          Update Your Location
        </h2>
        <p style={{ color: "#777", fontSize: "16px", marginBottom: "24px" ,textAlign: "left"}}>
          Enter your city, country, or region.
        </p>

        {/* Location Input Field */}
        <TextField
          value={location}
          onChange={handleLocationChange}
          fullWidth
          placeholder="Enter your location..."
          variant="outlined"
          sx={{ marginBottom: "20px", borderRadius: "8px" }}
        />

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

          >
            Next 
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditLocation;