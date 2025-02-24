import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";

const EditDepartment = ({ onNext, onPrevious }) => {
  const [department, setDepartment] = useState("");

  const handleSave = () => {
    console.log("Department saved:", department);
    onNext();
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
          Step 6: Edit Your Department
        </div>

        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "30px" }}>
          Update Your Department
        </h2>

        {/* Additional Instruction Sentence */}
        <p style={{ color: "#777", fontSize: "16px", marginBottom: "24px",textAlign: "left", }}>
          Please enter your department name. This will help to update your profile information.
        </p>

        {/* Department Input Field */}
        <TextField
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          fullWidth
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

          {/* Save Button */}
          <Button
            variant="contained"
            onClick={handleSave}
            style={{ backgroundColor: "#d84b2b", color: "#fff", width: "20%" }}

          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditDepartment;
