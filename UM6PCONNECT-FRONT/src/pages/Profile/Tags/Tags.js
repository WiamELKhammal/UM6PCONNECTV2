import React, { useState, useContext, useEffect } from "react";
import { Box, CardContent, Typography, Chip, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from "../../../context/UserContext";
import axios from 'axios';

const tagList = [
  "Web Development",
  "Node.js",
  "Python",
  "JavaScript",
  "AI",
  "CSS",
  "HTML",
];

const Tags = () => {
  const { user } = useContext(UserContext);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error message
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  // Fetch tags when user changes or page is loaded
  useEffect(() => {
    const fetchTags = async () => {
      if (user?._id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/tags/user/${user._id}`);
          const tags = response.data.map((tag) => tag.name); // Extract tag names
          setSelectedTags(tags); // Populate selected tags with fetched data
        } catch (error) {
          console.error("Error fetching tags:", error);
          setErrorMessage("Failed to fetch tags. Please try again.");
          setOpenSnackbar(true); // Show error message in snackbar
        }
      }
    };

    fetchTags();
  }, [user]);

  // Handle toggling tags (selecting and deselecting)
  const handleToggle = async (tag) => {
    if (user?._id) {
      try {
        if (selectedTags.includes(tag)) {
          await axios.delete(`http://localhost:5000/api/tags/${user._id}/${tag}`);
          setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
          await axios.post("http://localhost:5000/api/tags", { userId: user._id, name: tag });
          setSelectedTags([...selectedTags, tag]);
        }
      } catch (error) {
        console.error("Error toggling tag:", error);
        setErrorMessage("Failed to toggle tag. Please try again.");
        setOpenSnackbar(true);
      }
    }
  };

  // Handle adding custom tag
  const handleAddCustomTag = async () => {
    if (!customTag.trim()) {
      setErrorMessage("Tag name cannot be empty.");
      setOpenSnackbar(true);
      return;
    }

    if (customTag.length > 20) {
      setErrorMessage("Tag name cannot exceed 20 characters.");
      setOpenSnackbar(true);
      return;
    }

    if (selectedTags.includes(customTag)) {
      setErrorMessage("This tag already exists.");
      setOpenSnackbar(true);
      return;
    }

    if (user?._id) {
      try {
        await axios.post("http://localhost:5000/api/tags", { userId: user._id, name: customTag });
        setSelectedTags([...selectedTags, customTag]);
        setCustomTag(""); // Reset the input field
      } catch (error) {
        console.error("Error adding custom tag:", error);
        setErrorMessage("Failed to add tag. Please try again.");
        setOpenSnackbar(true);
      }
    }
  };

  // Handle removing a custom tag
  const handleRemoveCustomTag = async (tag) => {
    if (user?._id) {
      try {
        await axios.delete(`http://localhost:5000/api/tags/${user._id}/${tag}`);
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } catch (error) {
        console.error("Error removing custom tag:", error);
        setErrorMessage("Failed to remove tag. Please try again.");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <div className="box" style={{ width: "90%", margin: "20px auto", padding: "0px", fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif", border: "1px solid #ddd", borderRadius: "12px", backgroundClip: "padding-box", boxShadow: "none", overflow: "hidden" }}>
      <Box sx={{ padding: "16px", borderRadius: "12px", overflow: "hidden" }}>
        <CardContent sx={{ padding: "0px" }}>
          <div>
            <Typography variant="h6" sx={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>
              Tags
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#5a5a5a", mb: 2 }}>
              Add relevant tags to your profile.
            </Typography>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {tagList.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleToggle(tag)}
                sx={{
                  backgroundColor: selectedTags.includes(tag) ? "#cccc" : "#fff",
                  color: selectedTags.includes(tag) ? "#000" : "#000",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  borderRadius: 20,
                }}
              />
            ))}
          </div>

          <Typography variant="body2" sx={{ fontSize: "14px", color: "#333", marginBottom: "8px" }}>
            Selected Tags:
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {selectedTags.map((tag) => (
              <Chip
                key={tag}
                label={
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {tag}
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveCustomTag(tag)}
                      sx={{ marginLeft: "4px", padding: "0", color: "white" }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </span>
                }
                sx={{
                  backgroundColor: "#ea3b15",
                  color: "#fff",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <TextField
              fullWidth
              placeholder="Add your own tag"
              variant="outlined"
              size="small"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCustomTag();
                }
              }}
            />
            <IconButton
              onClick={handleAddCustomTag}
              sx={{
                backgroundColor: "#ea3b15",
                color: "#fff",
                padding: "8px",
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        </CardContent>
      </Box>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Tags;
