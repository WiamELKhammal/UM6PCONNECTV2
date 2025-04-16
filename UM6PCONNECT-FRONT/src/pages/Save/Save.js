import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";

const Save = ({ researcherId, user }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetch(`http://localhost:5000/api/save/saved/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          const savedIds = data.map((saved) => saved.researcher._id);
          setIsSaved(savedIds.includes(researcherId));
        })
        .catch((err) => console.error("Failed to fetch saved researchers:", err));
    }
  }, [researcherId, user]);

  const handleToggleSave = async () => {
    setLoading(true);
    const url = isSaved
      ? "http://localhost:5000/api/save/unsave"
      : "http://localhost:5000/api/save/save";

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, researcherId }),
      });
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleSave();
      }}
      startIcon={
        isSaved ? (
          <BookmarkRemoveOutlinedIcon fontSize="small" />
        ) : (
          <BookmarkAddOutlinedIcon fontSize="small" />
        )
      }
      sx={{
        border: "1px solid #e04c2c",
        color: "#e04c2c",
        textTransform: "none",
        fontSize: "13px",
        flex: 1,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      disabled={loading}
    >
      {isSaved ? "Unsave" : "Save"}
    </Button>
  );
};

export default Save;
