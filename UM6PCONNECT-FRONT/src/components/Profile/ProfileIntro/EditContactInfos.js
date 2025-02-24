import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";

const EditContactInfos = ({ onNext, onPrevious }) => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [url, setUrl] = useState(""); // State to hold the URL value
  const [focusedField, setFocusedField] = useState(null); // Track which field is focused
  const [urlError, setUrlError] = useState(false); // State to handle URL validation error

  // Function to handle the focus state for each input field
  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  // Function to validate the URL format
  const validateUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  // Handle URL change with validation
  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (newUrl && !validateUrl(newUrl)) {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
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
          Step 5: Edit Your Contact Info
        </div>

        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "30px" }}>
          Update Your Contact Information
        </h2>
        <p style={{ color: "#777", fontSize: "16px", marginBottom: "24px",textAlign: "left", }}>
          Please provide your phone number, address, date of birth, and any  links you'd like to include in your profile.
        </p>

        {/* Phone Input Field */}
        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          variant="outlined"
          onFocus={() => handleFocus("phone")}
          onBlur={handleBlur}
          sx={{
            marginBottom: "20px",
            borderRadius: "8px",
            borderColor: focusedField === "phone" ? "#e73d18" : "transparent", // Red border on focus
          }}
        />

        {/* Address Input Field */}
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          variant="outlined"
          onFocus={() => handleFocus("address")}
          onBlur={handleBlur}
          sx={{
            marginBottom: "20px",
            borderRadius: "8px",
            borderColor: focusedField === "address" ? "#e73d18" : "transparent", // Red border on focus
          }}
        />

        {/* Date of Birth Input Field */}
        <TextField
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          fullWidth
          variant="outlined"
          onFocus={() => handleFocus("dob")}
          onBlur={handleBlur}
          sx={{
            marginBottom: "20px",
            borderRadius: "8px",
            borderColor: focusedField === "dob" ? "#e73d18" : "transparent", // Red border on focus
          }}
        />

        {/* External Link (URL) Input Field */}
        <TextField
          label="URL"
          value={url}
          onChange={handleUrlChange}
          fullWidth
          variant="outlined"
          error={urlError} // Show error if URL is invalid
          helperText={urlError ? "Please enter a valid URL." : ""}
          onFocus={() => handleFocus("url")}
          onBlur={handleBlur}
          sx={{
            marginBottom: "20px",
            borderRadius: "8px",
            borderColor: focusedField === "url" ? "#e73d18" : "transparent", // Red border on focus
          }}
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

export default EditContactInfos;
