// components/FollowList.js
import React, { useEffect, useState, useContext } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Divider,
    Button,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

const FollowList = ({ activeTab }) => {
    const { user } = useContext(UserContext); // Get the logged-in user from context
    const [followers, setFollowers] = useState([]); // Store followers
    const [following, setFollowing] = useState([]); // Store following
    const [loading, setLoading] = useState(true); // Loading state for API calls
    const [userTags, setUserTags] = useState({}); // Store tags by user ID

    // Fetch followers and following for the logged-in user on mount
    useEffect(() => {
        if (user?._id) {
            // Fetch followers
            fetch(`http://localhost:5000/api/follow/followers/${user._id}`)
                .then((res) => res.json())
                .then((data) => {
                    setFollowers(data);
                })
                .catch((err) => console.error("Failed to fetch followers:", err));

            // Fetch following
            fetch(`http://localhost:5000/api/follow/following/${user._id}`)
                .then((res) => res.json())
                .then((data) => {
                    setFollowing(data);
                    setLoading(false); // Set loading to false after both requests complete
                })
                .catch((err) => console.error("Failed to fetch following:", err));
        }
    }, [user]);

    // Fetch tags for each user after followers and following are loaded
    useEffect(() => {
        const fetchTags = async (users) => {
            users.forEach((userItem) => {
                const userId = userItem.follower?._id || userItem.following?._id; // Get the user ID
                fetch(`http://localhost:5000/api/tags/user/${userId}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setUserTags((prevTags) => ({
                            ...prevTags,
                            [userId]: data, // Store tags in state by user ID
                        }));
                    })
                    .catch((err) => console.error("Failed to fetch tags for user:", err));
            });
        };

        fetchTags(followers); // Fetch tags for followers
        fetchTags(following); // Fetch tags for following
    }, [followers, following]);

    // Handle unfollow action
    const handleUnfollow = async (userId) => {
        try {
            const requestBody = { followerId: user._id, followingId: userId };
            console.log("Unfollow Request Body:", requestBody); // Log the request body for debugging

            const response = await fetch("http://localhost:5000/api/follow/unfollow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Unfollow Error:", errorData);
                throw new Error(errorData.message || "Failed to unfollow user");
            }

            // Remove the unfollowed user from the local state
            setFollowing((prev) => prev.filter((u) => u.following._id !== userId));
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
            {loading ? (
                <Typography>Loading follow list...</Typography>
            ) : (
                <>
                    {/* Followers Tab */}
                    {activeTab === "followers" && (
                        <Box>
                            {followers.length === 0 ? (
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

                                    <h4 style={{ fontWeight: "400", fontSize: "18px", color: "#000" }}>
                                        Your followers list is currently empty. When someone follows  you , it appears here.

                                    </h4>
                                </Box>
                            ) : (
                                <List sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 1 }}>
                                    {followers.map((follower) => (
                                        <React.Fragment key={follower.follower._id}>
                                            <ListItem
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    p: 2,
                                                    bgcolor: "#FFF",
                                                    border: "1px solid #CCC",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    mb: 2,
                                                    "&:hover": { bgcolor: "#f5f5f5" },
                                                }}
                                            >
                                                {/* Follower Details */}
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, overflow: "hidden" }}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={follower.follower.profilePicture || "/assets/images/default-profile.png"}
                                                            sx={{ width: 50, height: 50, border: "2px solid #ddd" }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography fontWeight="bold" fontSize="14px">
                                                                {follower.follower.Prenom} {follower.follower.Nom}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <>
                                                                <Typography fontSize="12px" fontWeight="500" color="textPrimary">
                                                                    {follower.follower.headline || "No headline available"}
                                                                </Typography>
                                                                <Typography fontSize="12px" color="textSecondary">
                                                                    {follower.follower.Departement || "No department available"}
                                                                </Typography>
                                                                <Typography
                                                                    fontSize="12px"
                                                                    color="textSecondary"
                                                                    sx={{
                                                                        textAlign: "justify", // Justify bio text
                                                                        textJustify: "inter-word",
                                                                        wordBreak: "break-word",
                                                                    }}
                                                                >
                                                                    {follower.follower.bio || "No bio available."}
                                                                </Typography>
                                                                {/* Display tags inline */}
                                                                {userTags[follower.follower._id] &&
                                                                    userTags[follower.follower._id].length > 0 ? (
                                                                    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap" }}>
                                                                        {userTags[follower.follower._id].map((tag) => (
                                                                            <Button
                                                                                key={tag._id}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                sx={{
                                                                                    borderRadius: 20,
                                                                                    borderColor: "#ccc",
                                                                                    color: "#3b444b ",
                                                                                    minWidth: "auto",
                                                                                    px: 2,
                                                                                    mx: 0.3,
                                                                                    backgroundColor: "#f7f7f7",
                                                                                    "&:hover": {
                                                                                        backgroundColor: "#fafafa",
                                                                                        borderColor: "#ccc",
                                                                                    },
                                                                                }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation(); // Prevent parent click
                                                                                    console.log("Tag clicked:", tag.name);
                                                                                }}
                                                                            >
                                                                                {tag.name}
                                                                            </Button>
                                                                        ))}
                                                                    </Box>
                                                                ) : (
                                                                    <Typography fontSize="12px" color="textSecondary">
                                                                        No tags available.
                                                                    </Typography>
                                                                )}
                                                            </>
                                                        }
                                                    />
                                                </Box>
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    ))}
                                </List>
                            )}
                        </Box>
                    )}

                    {/* Following Tab */}
                    {activeTab === "following" && (
                        <Box>
                            {following.length === 0 ? (
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
                         
                                    <h4 style={{ fontWeight: "400", fontSize: "18px", color: "#000" }}>
                                        Your following list is currently empty. When you follow  someone , it appears here.

                                    </h4>
                                </Box>
                            ) : (
                                <List sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 1 }}>
                                    {following.map((followedUser) => (
                                        <React.Fragment key={followedUser.following._id}>
                                            <ListItem
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    p: 2,
                                                    bgcolor: "#FFF",
                                                    border: "1px solid #CCC",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    mb: 2,
                                                    "&:hover": { bgcolor: "#f5f5f5" },
                                                }}
                                            >
                                                {/* Following Details */}
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, overflow: "hidden" }}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={followedUser.following.profilePicture || "/assets/images/default-profile.png"}
                                                            sx={{ width: 50, height: 50, border: "2px solid #ddd" }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography fontWeight="bold" fontSize="14px">
                                                                {followedUser.following.Prenom} {followedUser.following.Nom}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <>
                                                                <Typography fontSize="12px" fontWeight="500" color="textPrimary">
                                                                    {followedUser.following.headline || "No headline available"}
                                                                </Typography>
                                                                <Typography fontSize="12px" color="textSecondary">
                                                                    {followedUser.following.Departement || "No department available"}
                                                                </Typography>
                                                                <Typography
                                                                    fontSize="12px"
                                                                    color="textSecondary"
                                                                    sx={{
                                                                        textAlign: "justify", // Justify bio text
                                                                        textJustify: "inter-word",
                                                                        wordBreak: "break-word",
                                                                    }}
                                                                >
                                                                    {followedUser.following.bio || "No bio available."}
                                                                </Typography>
                                                                {/* Display tags inline */}
                                                                {userTags[followedUser.following._id] &&
                                                                    userTags[followedUser.following._id].length > 0 ? (
                                                                    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap" }}>
                                                                        {userTags[followedUser.following._id].map((tag) => (
                                                                            <Button
                                                                                key={tag._id}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                sx={{
                                                                                    borderRadius: 20,
                                                                                    borderColor: "#ccc",
                                                                                    color: "#3b444b ",
                                                                                    minWidth: "auto",
                                                                                    px: 2,
                                                                                    mx: 0.3,
                                                                                    backgroundColor: "#f7f7f7",
                                                                                    "&:hover": {
                                                                                        backgroundColor: "#fafafa",
                                                                                        borderColor: "#ccc",
                                                                                    },
                                                                                }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation(); // Prevent parent click
                                                                                    console.log("Tag clicked:", tag.name);
                                                                                }}
                                                                            >
                                                                                {tag.name}
                                                                            </Button>
                                                                        ))}
                                                                    </Box>
                                                                ) : (
                                                                    <Typography fontSize="12px" color="textSecondary">
                                                                        No tags available.
                                                                    </Typography>
                                                                )}
                                                            </>
                                                        }
                                                    />
                                                </Box>

                                                {/* Unfollow Button */}
                                                <IconButton
                                                    sx={{ color: "#ea3b15" }}
                                                    onClick={() => handleUnfollow(followedUser.following._id)}
                                                >
                                                    <PersonRemoveOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    ))}
                                </List>
                            )}
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default FollowList;