import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

const Follow = ({ researcherId, user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetch(`http://localhost:5000/api/follow/following/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          const followingIds = data.map((follow) => follow.following._id);
          setIsFollowing(followingIds.includes(researcherId));
        })
        .catch((err) => console.error("Failed to fetch followed users:", err));
    }
  }, [researcherId, user]);

  const handleToggleFollow = async () => {
    setLoading(true);
    const url = isFollowing
      ? "http://localhost:5000/api/follow/unfollow"
      : "http://localhost:5000/api/follow/follow";

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followerId: user._id,
          followingId: researcherId,
        }),
      });
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleFollow();
      }}
      startIcon={
        isFollowing ? (
          <PersonRemoveOutlinedIcon fontSize="small" />
        ) : (
          <PersonAddOutlinedIcon fontSize="small" />
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
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Follow;
