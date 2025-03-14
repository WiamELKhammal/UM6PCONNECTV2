import React, { useState, useContext } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const AddLicense = ({ open, onClose, fetchLicenses }) => {
  const { user } = useContext(UserContext);

  const [license, setLicense] = useState({
    licenseName: "",
    issuedBy: "",
    issueDate: "",
    expirationDate: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLicense({ ...license, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");

    if (!user?._id) {
      setError("User ID is missing. Cannot add license.");
      return;
    }

    if (!license.licenseName || !license.issuedBy || !license.issueDate) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/licenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...license, userId: user._id }),
      });

      if (response.ok) {
        fetchLicenses();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save license.");
      }
    } catch (error) {
      setError("An error occurred while saving the license.");
      console.error("Failed to save license:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add License</DialogTitle>
      <DialogContent>
        <TextField label="License Name" name="licenseName" value={license.licenseName} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Issued By" name="issuedBy" value={license.issuedBy} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Issue Date" name="issueDate" type="date" value={license.issueDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField label="Expiration Date" name="expirationDate" type="date" value={license.expirationDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField label="Description" name="description" value={license.description} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleSave} style={{ backgroundColor: "#d84b2b", color: "#fff" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLicense;
