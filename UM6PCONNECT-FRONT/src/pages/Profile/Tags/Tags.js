import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  CardContent,
  Typography,
  Chip,
  Snackbar,
  Alert
} from "@mui/material";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      if (user?._id && user?.token) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/tags/user/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`, // ✅ Attach token
              },
            }
          );
          const tags = response.data.tags;
          setSelectedTags(tags);
        } catch (error) {
          console.error("Error fetching tags:", error.response?.data || error.message);
          setErrorMessage("Failed to fetch tags. Please try again.");
          setOpenSnackbar(true);
        }
      }
    };

    fetchTags();
  }, [user]);

  const handleToggle = async (tag) => {
    if (user?._id) {
      try {
        if (selectedTags.includes(tag)) {
          await axios.delete(`http://localhost:5000/api/tags/${user._id}/${tag}`, {
            headers: {
              Authorization: `Bearer ${user.token}`, // ✅ attach token
            },
          });
          setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
          await axios.post("http://localhost:5000/api/tags", 
            { name: tag },
            {
              headers: {
                Authorization: `Bearer ${user.token}`, // ✅ attach token
              },
            }
          );
          setSelectedTags([...selectedTags, tag]);
        }
      } catch (error) {
        console.error("Error toggling tag:", error.response?.data || error.message);
        setErrorMessage("Failed to toggle tag. Please try again.");
        setOpenSnackbar(true);
      }
    }
  };
  

  return (
    <Box
      className="box"
      sx={{
        width: { xs: "95%", sm: "90%" },
        margin: "20px auto",
        padding: 0,
        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundClip: "padding-box",
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <Box sx={{ padding: "16px" }}>
        <CardContent sx={{ padding: 0 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", fontSize: "18px", color: "#000" }}
          >
            Tags
          </Typography>
          <Typography sx={{ fontSize: "16px", color: "#5a5a5a", mb: 2 }}>
            Select relevant tags to show your interests.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
              justifyContent: { xs: "center", sm: "flex-start" }, // 📱 center chips on mobile
            }}
          >
            {tagList.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleToggle(tag)}
                sx={{
                  backgroundColor: selectedTags.includes(tag) ? "#ea3b15" : "#fff",
                  color: selectedTags.includes(tag) ? "#fff" : "#000",
                  border: selectedTags.includes(tag) ? "1px solid #ea3b15" : "1px solid #ddd",
                  cursor: "pointer",
                  borderRadius: "20px",
                  fontSize: { xs: "12px", sm: "14px" }, // 📱 smaller font on phone
                  padding: "4px 10px",
                }}
              />
            ))}
          </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert
              severity="error"
              onClose={() => setOpenSnackbar(false)}
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </CardContent>
      </Box>
    </Box>
  );
};

export default Tags;
