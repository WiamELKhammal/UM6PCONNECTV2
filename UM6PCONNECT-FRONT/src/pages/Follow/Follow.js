// components/Follow/Follow.js
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

const Follow = ({ researcherId, user }) => {
  const [isFollowing, setIsFollowing] = useState(false); // Track if the user is following the researcher
  const [loading, setLoading] = useState(false); // Loading state for follow/unfollow

  // Fetch followed users for the logged-in user on mount
  useEffect(() => {
    if (user?._id) {
      fetch(`http://localhost:5000/api/follow/following/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          const followingIds = data.map((follow) => follow.following._id); // Extract followed user IDs
          setIsFollowing(followingIds.includes(researcherId)); // Check if current researcher is followed
        })
        .catch((err) => console.error("Failed to fetch followed users:", err));
    }
  }, [researcherId, user]);

  // Follow a researcher
  const handleFollowResearcher = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/follow/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId: user._id, followingId: researcherId }),
      });
      setIsFollowing(true); // Update local state
    } catch (error) {
      console.error("Error following researcher:", error);
    } finally {
      setLoading(false);
    }
  };

  // Unfollow a researcher
  const handleUnfollowResearcher = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/follow/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId: user._id, followingId: researcherId }),
      });
      setIsFollowing(false); // Update local state
    } catch (error) {
      console.error("Error unfollowing researcher:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      sx={{ color: "#d84b2b" }}
      onClick={(e) => {
        e.stopPropagation(); // Prevent parent click
        if (isFollowing) {
          handleUnfollowResearcher(); // Unfollow if already following
        } else {
          handleFollowResearcher(); // Follow if not following
        }
      }}
      disabled={loading}
    >
      {isFollowing ? (
        <PersonRemoveOutlinedIcon fontSize="small" sx={{ color: "#d84b2b" }} /> // Red if following
      ) : (
        <PersonAddOutlinedIcon fontSize="small" /> // Default color if not following
      )}
    </IconButton>
  );
};

export default Follow;