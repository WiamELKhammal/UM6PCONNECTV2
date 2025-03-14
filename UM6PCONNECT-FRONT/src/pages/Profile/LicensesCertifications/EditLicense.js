import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const EditLicense = ({ open, onClose, licenseData, fetchLicenses }) => {
  const { user } = useContext(UserContext);

  const [license, setLicense] = useState({
    licenseName: "",
    issuedBy: "",
    issueDate: "",
    expirationDate: "",
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (licenseData) {
      setLicense({
        licenseName: licenseData.licenseName || "",
        issuedBy: licenseData.issuedBy || "",
        issueDate: licenseData.issueDate || "",
        expirationDate: licenseData.expirationDate || "",
        description: licenseData.description || "",
      });
    }
  }, [licenseData]);

  const handleChange = (e) => {
    setLicense({ ...license, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setError("");

    if (!user?._id || !licenseData?._id) {
      setError("User ID or License ID is missing. Cannot update license.");
      return;
    }

    if (!license.licenseName || !license.issuedBy || !license.issueDate) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/licenses/${licenseData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...license, userId: user._id }),
      });

      if (response.ok) {
        fetchLicenses();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update license.");
      }
    } catch (error) {
      setError("An error occurred while updating the license.");
      console.error("Failed to update license:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit License</DialogTitle>
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
        <Button onClick={handleUpdate} style={{ backgroundColor: "#d84b2b", color: "#fff" }}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLicense;
