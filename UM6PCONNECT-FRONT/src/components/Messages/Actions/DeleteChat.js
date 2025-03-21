import React, { useState } from "react";
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography
} from "@mui/material";
import axios from "axios";

const DeleteChat = ({ open, onClose, userId, contactId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // ✅ Track errors

  const handleDelete = async () => {
    if (!userId || !contactId) {
      console.error("Missing required IDs.");
      setError("User ID or Contact ID is missing.");
      return;
    }

    setLoading(true);
    setError(null); // ✅ Reset error before trying again

    try {
      const response = await axios.post("http://localhost:5000/api/messages/delete", {
        userId,
        contactId,
      });

      console.log("Chat deleted successfully:", response.data);
      onClose(); // ✅ Close modal after deletion
    } catch (error) {
      console.error("Error deleting chat:", error);
      setError("Failed to delete chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this chat? It will be removed from your side only.
        </DialogContentText>

        {/* ✅ Show Error Message if Deletion Fails */}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "#666" }} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          style={{ color: "#ea3b15" }}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteChat;
