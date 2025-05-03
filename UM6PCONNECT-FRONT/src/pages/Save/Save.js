import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";

const Save = ({ researcherId, user }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedResearchers = async () => {
      if (user?._id && user?.token) {
        try {
          const res = await fetch(`http://localhost:5000/api/save/saved`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await res.json();
          const savedIds = data.map((saved) => saved.researcher._id);
          setIsSaved(savedIds.includes(researcherId));
        } catch (err) {
          console.error("Failed to fetch saved researchers:", err);
        }
      }
    };

    fetchSavedResearchers();
  }, [researcherId, user]);

  const handleToggleSave = async () => {
    if (!user?.token) return;
    setLoading(true);
    const url = isSaved
      ? "http://localhost:5000/api/save/unsave"
      : "http://localhost:5000/api/save/save";

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ researcherId }),
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
        border: "1px solid #ea3b15",
        color: "#ea3b15",
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
