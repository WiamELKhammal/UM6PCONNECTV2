import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../../../context/UserContext";
import ProfileSetup from "./ProfileSetup";
import EditProfilePic from "./EditProfilePic";
import EditCoverPic from "./EditCoverPic";

const EditProfileForm = ({ open, onClose, onSave }) => {
  const { user, setUser } = useContext(UserContext);

  // Only these fields will be available for editing.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    department: "",
    linkedIn: "",
    researchGate: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.Prenom || "",
        lastName: user?.Nom || "",
        headline: user?.headline || "",
        department: user?.Departement || "",
        linkedIn: user?.linkedIn || "",
        researchGate: user?.researchGate || "",
      });
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
  
    if (!user?._id) {
      setError("User ID is missing.");
      setLoading(false);
      return;
    }
  
    try {
      const payload = {
        Prenom: formData.firstName,
        Nom: formData.lastName,
        headline: formData.headline,
        Departement: formData.department,  // <== Remap here
        linkedIn: formData.linkedIn,
        researchGate: formData.researchGate,
      };
  
      const response = await fetch(
        `http://localhost:5000/api/profile/${String(user._id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) throw new Error("Failed to update profile.");
  
      const updatedUser = await response.json();
  
      setUser(updatedUser.user);
      localStorage.setItem("user", JSON.stringify(updatedUser.user));
  
      onSave();
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "800px",
          height: "95vh",
          margin: "2.5vh auto",
          textAlign: "center",
          position: "relative",
          overflowY: "auto",
        }}
      >
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

        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "30px" }}>
          Edit Profile
        </h2>
        <p
          style={{
            color: "#777",
            fontSize: "16px",
            marginBottom: "24px",
            textAlign: "left",
          }}
        >
          Update your personal information below.
        </p>

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          label="Headline"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          label="LinkedIn"
          name="linkedIn"
          value={formData.linkedIn}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          label="ResearchGate"
          name="researchGate"
          value={formData.researchGate}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            onClick={handleSave}
            style={{ backgroundColor: "#e04c2c", color: "#fff", width: "100%" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileForm;
