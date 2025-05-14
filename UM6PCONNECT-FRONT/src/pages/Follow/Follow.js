import React, { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { UserContext } from "../../context/UserContext";

const Follow = ({ researcherId }) => {
  const { user } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (user?._id && user?.token) {
        try {
          const res = await fetch(`https://um6pconnectv2-production.up.railway.app/api/follow/following/${user._id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await res.json();
          const followingIds = data.map((follow) => follow.following._id);
          setIsFollowing(followingIds.includes(researcherId));
        } catch (err) {
          console.error("Failed to fetch followed users:", err);
        }
      }
    };

    fetchFollowing();
  }, [researcherId, user]);

  const handleToggleFollow = async () => {
    if (!user?.token) return;

    setLoading(true);
    const url = isFollowing
      ? "https://um6pconnectv2-production.up.railway.app/api/follow/unfollow"
      : "https://um6pconnectv2-production.up.railway.app/api/follow/follow";

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          followingId: researcherId, // ✅ ONLY followingId
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
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Follow;
