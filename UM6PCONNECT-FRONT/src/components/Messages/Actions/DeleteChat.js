import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const DeleteChat = ({ open, onClose, userId, contactId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext); // ✅ Access user token

  const handleDelete = async () => {
    if (!userId || !contactId || !user?.token) {
      setError("Missing required IDs or token.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://um6pconnectv2-production.up.railway.app/api/messages/delete",
        { userId, contactId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // ✅ Add token
          },
        }
      );

      console.log("Chat deleted successfully:", response.data);
      onClose();
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
