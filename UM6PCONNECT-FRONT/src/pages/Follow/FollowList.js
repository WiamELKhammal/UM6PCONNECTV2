import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

const FollowList = ({ activeTab }) => {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userTags, setUserTags] = useState({});

  useEffect(() => {
    const fetchFollowersAndFollowing = async () => {
      if (user?.token) {
        try {
          const [followersRes, followingRes] = await Promise.all([
            fetch(`http://localhost:5000/api/follow/followers/${user._id}`, {
              headers: { Authorization: `Bearer ${user.token}` },
            }),
            fetch(`http://localhost:5000/api/follow/following/${user._id}`, {
              headers: { Authorization: `Bearer ${user.token}` },
            }),
          ]);
          const followersData = await followersRes.json();
          const followingData = await followingRes.json();
          setFollowers(followersData);
          setFollowing(followingData);
        } catch (err) {
          console.error("Failed to fetch followers/following:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFollowersAndFollowing();
  }, [user]);

  useEffect(() => {
    const fetchTagsForUsers = async (users) => {
      if (!user?.token) return;

      const tagFetches = users.map((u) => {
        const id = u.follower?._id || u.following?._id;
        return fetch(`http://localhost:5000/api/tags/user/${id}`)
          .then((res) => res.json())
          .then((data) => ({ id, tags: data.tags || [] }))
          .catch(() => ({ id, tags: [] }));
      });

      const results = await Promise.all(tagFetches);
      const tagsMap = {};
      results.forEach(({ id, tags }) => {
        tagsMap[id] = tags;
      });
      setUserTags(tagsMap);
    };

    if (followers.length || following.length) {
      fetchTagsForUsers([...followers, ...following]);
    }
  }, [followers, following, user]);

  const handleUnfollow = async (researcherId) => {
    try {
      await fetch("http://localhost:5000/api/follow/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ followingId: researcherId }),
      });
      setFollowing((prev) => prev.filter((f) => f.following._id !== researcherId));
    } catch (error) {
      console.error("Error unfollowing:", error);
    }
  };

  const renderUser = (u, isFollower) => {
    const userData = isFollower ? u.follower : u.following;
    if (!userData) return null;

    return (
      <Box
        key={userData._id}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          borderRadius: "10px",
          p: 2,
          backgroundColor: "#fff",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Avatar
            src={userData.profilePicture || "/assets/images/default-profile.png"}
            sx={{ width: 70, height: 70, border: "2px solid #ddd" }}
          />
          <Box flex={1}>
            <Typography fontWeight="bold" fontSize="18px" color="black">
              {userData.Prenom} {userData.Nom}
            </Typography>
            <Typography fontSize="14px" color="text.secondary" mt={0.5}>
              {userData.headline || "No headline"}
            </Typography>
            <Typography fontSize="14px" color="text.secondary">
              {userData.Departement || "No department"}
            </Typography>

            {/* Render tags */}
            {userTags[userData._id]?.length > 0 ? (
              <Box mt={1} display="flex" flexWrap="wrap">
                {userTags[userData._id].map((tag, idx) => (
                  <Button
                    key={idx}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 20,
                      fontSize: "12px",
                      px: 2,
                      m: 0.5,
                      borderColor: "#ccc",
                      color: "#333",
                      backgroundColor: "#f9f9f9",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {tag}
                  </Button>
                ))}
              </Box>
            ) : (
              <Typography fontSize="13px" color="text.secondary" mt={1}>
                No tags available
              </Typography>
            )}
          </Box>
        </Box>

        {!isFollower && (
          <Button
            variant="outlined"
            onClick={() => handleUnfollow(userData._id)}
            sx={{
              mt: 2,
              color: "#ea3b15",
              borderColor: "#ea3b15",
              width: "100%",
              textTransform: "none",
              "&:hover": { backgroundColor: "#fbe4e0" },
            }}
            startIcon={<PersonRemoveOutlinedIcon />}
          >
            Unfollow
          </Button>
        )}
      </Box>
    );
  };

  const EmptyState = ({ text }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "300px",
        textAlign: "center",
      }}
    >
      <PersonAddOutlinedIcon sx={{ fontSize: "48px", color: "#ea3b15", mb: 2 }} />
      <Typography fontSize="18px" fontWeight="400" color="black">
        {text}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto", backgroundColor: "#FFF" }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {activeTab === "followers" && (
            <Box>
              {followers.length === 0 ? (
                <EmptyState text="No followers yet." />
              ) : (
                followers.map((f) => renderUser(f, true))
              )}
            </Box>
          )}
          {activeTab === "following" && (
            <Box>
              {following.length === 0 ? (
                <EmptyState text="You're not following anyone yet." />
              ) : (
                following.map((f) => renderUser(f, false))
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default FollowList;
