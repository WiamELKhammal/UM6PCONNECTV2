import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Save = ({ researcherId, user }) => {
  const [isSaved, setIsSaved] = useState(false); // Track if the researcher is saved
  const [loading, setLoading] = useState(false); // Loading state for save/unsave

  // Fetch saved researchers for the logged-in user on mount
  useEffect(() => {
    if (user?._id) {
      fetch(`http://localhost:5000/api/save/saved/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          const savedIds = data.map((saved) => saved.researcher._id); // Extract researcher IDs
          setIsSaved(savedIds.includes(researcherId)); // Check if current researcher is saved
        })
        .catch((err) => console.error("Failed to fetch saved researchers:", err));
    }
  }, [researcherId, user]);

  // Save a researcher
  const handleSaveResearcher = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/save/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, researcherId }),
      });
      setIsSaved(true); // Update local state
    } catch (error) {
      console.error("Error saving researcher:", error);
    } finally {
      setLoading(false);
    }
  };

  // Unsave a researcher
  const handleUnsaveResearcher = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/save/unsave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, researcherId }),
      });
      setIsSaved(false); // Update local state
    } catch (error) {
      console.error("Error unsaving researcher:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      sx={{ color: "#ea3b15" }}
      onClick={(e) => {
        e.stopPropagation(); // Prevent parent click
        if (isSaved) {
          handleUnsaveResearcher(); // Unsave if already saved
        } else {
          handleSaveResearcher(); // Save if not saved
        }
      }}
      disabled={loading}
    >
      {isSaved ? (
        <BookmarkIcon fontSize="small" sx={{ color: "#ea3b15" }} /> // Green if saved
      ) : (
        <BookmarkBorderIcon fontSize="small" /> // Default color if not saved
      )}
    </IconButton>
  );
};

export default Save;