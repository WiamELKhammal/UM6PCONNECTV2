import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteLanguage = ({ open, onClose, languageId, fetchLanguages }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!languageId) {
      console.error("No language ID provided.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/languages/${languageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchLanguages(); // Refresh the language list after deletion
        onClose(); // Close the dialog
        console.log("Language deleted successfully.");
      } else {
        const error = await response.json();
        console.error("Failed to delete language:", error.message);
      }
    } catch (error) {
      console.error("Error deleting language:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this language? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "#666" }} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          style={{ color: "#e04c2c" }}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLanguage;
