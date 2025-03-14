// components/Save/SavedList.js
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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const SavedList = () => {
    const { user } = useContext(UserContext); // Get the logged-in user from context
    const [savedResearchers, setSavedResearchers] = useState([]); // Store saved researchers
    const [loading, setLoading] = useState(true); // Loading state for API calls
    const [researcherTags, setResearcherTags] = useState({}); // Store tags by researcher ID

    // Fetch saved researchers for the logged-in user on mount
    useEffect(() => {
        if (user?._id) {
            fetch(`http://localhost:5000/api/save/saved/${user._id}`)
                .then((res) => res.json())
                .then((data) => {
                    const standardizedResearchers = data.map((saved) => ({
                        _id: saved.researcher._id,
                        Prenom: saved.researcher.Prenom || "Unknown",
                        Nom: saved.researcher.Nom || "User",
                        headline: saved.researcher.headline || "No headline available",
                        bio: saved.researcher.bio || "No bio available.",
                        Departement: saved.researcher.Departement || "No department available",
                        profilePic: saved.researcher.profilePic || "/assets/images/default-profile.png",
                    }));
                    setSavedResearchers(standardizedResearchers);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch saved researchers:", err);
                    setLoading(false);
                });
        }
    }, [user]);

    // Fetch tags for each researcher after researchers are loaded
    useEffect(() => {
        savedResearchers.forEach((researcher) => {
            fetch(`http://localhost:5000/api/tags/user/${researcher._id}`)
                .then((res) => res.json())
                .then((data) => {
                    setResearcherTags((prevTags) => ({
                        ...prevTags,
                        [researcher._id]: data, // Store tags in state by researcher ID
                    }));
                })
                .catch((err) => console.error("Failed to fetch tags for user:", err));
        });
    }, [savedResearchers]);

    // Unsave a researcher
    const handleUnsaveResearcher = async (researcherId) => {
        try {
            await fetch("http://localhost:5000/api/save/unsave", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id, researcherId }),
            });

            // Remove the unsaved researcher from the local state
            setSavedResearchers((prev) => prev.filter((r) => r._id !== researcherId));
        } catch (error) {
            console.error("Error unsaving researcher:", error);
        }
    };

    return (
        <Box sx={{
            width: "90%",
            margin: "20px auto",
            padding: "20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
            position: "relative",
            border: "1px solid #ddd",
            borderRadius: "12px",
            backgroundClip: "padding-box",
            boxShadow: "none",
        }}>

            <div>
                <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Saved Profiles</h4>
            </div>
            {/* Display loading or no saved items */}
            {loading ? (
                <Typography>Loading saved profiles...</Typography>
            ) : savedResearchers.length === 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "300px", // Adjust height as needed
                        textAlign: "center",
                    }}
                >
                    {/* Icon */}
                    <BookmarkBorderIcon
                        sx={{
                            fontSize: "48px",
                            color: "#d84b2b", // Match your app's theme color
                            mb: 2,
                        }}
                    />
                    {/* Text */}
                    <div>
                <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>
                Your list is currently empty. When you save a profile , it appears here.

                </h4>
            </div>
                </Box>
            ) : (
                <List sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 1 }}>
                    {savedResearchers.map((researcher) => (
                        <React.Fragment key={researcher._id}>
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
                                {/* Researcher Details */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, overflow: "hidden" }}>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={researcher.profilePic}
                                            sx={{ width: 50, height: 50, border: "2px solid #ddd" }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography fontWeight="bold" fontSize="14px">
                                                {researcher.Prenom} {researcher.Nom}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography fontSize="12px" fontWeight="500" color="textPrimary">
                                                    {researcher.headline}
                                                </Typography>
                                                <Typography fontSize="12px" color="textSecondary">
                                                    {researcher.Departement}
                                                </Typography>
                                                <Typography fontSize="12px" color="textSecondary">
                                                    {researcher.bio}
                                                </Typography>

                                                {/* Display tags inline */}
                                                {researcherTags[researcher._id] &&
                                                    researcherTags[researcher._id].length > 0 ? (
                                                    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap" }}>
                                                        {researcherTags[researcher._id].map((tag) => (
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

                                {/* Unsave Button */}
                                <IconButton
                                    sx={{ color: "#d84b2b" }}
                                    onClick={() => handleUnsaveResearcher(researcher._id)}
                                >
                                    <BookmarkIcon fontSize="small" sx={{ color: "#d84b2b" }} />
                                </IconButton>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default SavedList;