import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const DeleteLicense = ({ open, onClose, licenseId, fetchLicenses }) => {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");

    if (!licenseId) {
      setError("License ID is missing. Cannot delete.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/licenses/${licenseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchLicenses();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete license.");
      }
    } catch (error) {
      setError("An error occurred while deleting the license.");
      console.error("Failed to delete license:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete License</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this license? This action cannot be undone.</Typography>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleDelete} style={{ backgroundColor: "#ea3b15", color: "#fff" }}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLicense;
