import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  useMediaQuery,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../../../context/UserContext";
import { useTheme } from "@mui/material/styles";

const EditProfileForm = ({ open, onClose, onSave }) => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    department: "",
    linkedIn: "",
    researchGate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    if (!user?.token) {
      setError("No token available.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        Prenom: formData.firstName,
        Nom: formData.lastName,
        headline: formData.headline,
        Departement: formData.department,
        linkedIn: formData.linkedIn,
        researchGate: formData.researchGate,
      };

      const response = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update profile.");

      const { user: updatedUser } = await response.json(); // ✅ Correctly extract "user"
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Store updated user

      onSave(); // Close modal
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          p: isMobile ? 2 : 4,
          borderRadius: "10px",
          width: isMobile ? "95%" : "600px",
          height: isMobile ? "95vh" : "auto",
          margin: "2.5vh auto",
          textAlign: "center",
          position: "relative",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            color: "#000",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" sx={{ color: "#333", mb: 2, fontSize: isMobile ? 24 : 30 }}>
          Edit Profile
        </Typography>

        <Typography
          sx={{
            color: "#777",
            fontSize: isMobile ? 14 : 16,
            mb: 3,
            textAlign: "left",
          }}
        >
          Update your personal information below.
        </Typography>

        <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="Headline" name="headline" value={formData.headline} onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="Department" name="department" value={formData.department} onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="LinkedIn" name="linkedIn" value={formData.linkedIn} onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="ResearchGate" name="researchGate" value={formData.researchGate} onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#ea3b15",
              color: "#fff",
              width: { xs: "100%", sm: "auto" },
              px: 5,
              "&:hover": { backgroundColor: "#c53612" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
          </Button>
        </Box>

        {error && (
          <Typography
            sx={{
              color: "red",
              mt: 2,
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default EditProfileForm;
