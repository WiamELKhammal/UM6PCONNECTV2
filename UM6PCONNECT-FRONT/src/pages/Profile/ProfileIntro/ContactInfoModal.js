import React, { useState, useContext } from "react";
import { Modal, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../../../context/UserContext";
import { LocationOn, Email, Phone, Language, Home } from "@mui/icons-material";

const ContactInfoModal = ({ open, onClose }) => {
  const { user } = useContext(UserContext);

  const [contactInfo, setContactInfo] = useState({
    location: user?.location || "",
    address: user?.address || "",
    email: user?.Email || "",
    phone: user?.telephone || "",
    website: user?.url || "",
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "600px", // Reduced the max width
          height: "auto", // Auto height to fit the content
          margin: "auto", // Centered horizontally
          position: "absolute", // To position the modal on the screen
          top: "50%", // Center vertically
          left: "50%", // Center horizontally
          transform: "translate(-50%, -50%)", // Correct positioning from the center
          textAlign: "center",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "#000",
          }}
        >
          <CloseIcon />
        </IconButton>
        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "30px" }}>Contact Information</h2>

        <p style={{ color: "#777", fontSize: "16px", marginBottom: "24px", textAlign: "left" }}>
        Below are your contact details.
        </p>
        {/* Location */}
        {contactInfo.location && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <LocationOn fontSize="small" style={{ marginRight: "10px", color: "#777" }} />
            <span style={{ color: "#000" }}>{contactInfo.location}</span>
          </div>
        )}

        {/* Address */}
        {contactInfo.address && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Home fontSize="small" style={{ marginRight: "10px", color: "#777" }} /> {/* Added Home icon */}
            <span style={{ color: "#000" }}>{contactInfo.address}</span>
          </div>
        )}

        {/* Email */}
        {contactInfo.email && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Email fontSize="small" style={{ marginRight: "10px", color: "#777" }} />
            <a href={`mailto:${contactInfo.email}`} style={{ textDecoration: "none", color: "#000" }}>
              {contactInfo.email}
            </a>
          </div>
        )}

        {/* Phone */}
        {contactInfo.phone && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Phone fontSize="small" style={{ marginRight: "10px", color: "#000" }} />
            <span>{contactInfo.phone}</span>
          </div>
        )}

        {/* Website */}
        {contactInfo.website && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Language fontSize="small" style={{ marginRight: "10px", color: "#777" }} />
            <a
              href={contactInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#000" }}
            >
              {contactInfo.website}
            </a>
          </div>
        )}

      </Box>
    </Modal>
  );
};

export default ContactInfoModal;
