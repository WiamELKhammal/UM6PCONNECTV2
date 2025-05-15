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
  const { user } = useContext(UserContext);
  const [savedResearchers, setSavedResearchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [researcherTags, setResearcherTags] = useState({});

  useEffect(() => {
    if (user?._id && user?.token) {
      fetch(`https://um6pconnectv2-production.up.railway.app/api/save/saved`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const standardizedResearchers = data.map((saved) => ({
            _id: saved.researcher._id,
            Prenom: saved.researcher.Prenom || "Unknown",
            Nom: saved.researcher.Nom || "User",
            headline: saved.researcher.headline || "No headline available",
            bio: saved.researcher.bio || "No bio available.",
            Departement: saved.researcher.Departement || "No department available",
            profilePic: saved.researcher.profilePicture || "/assets/images/default-profile.png",
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

  useEffect(() => {
    savedResearchers.forEach((researcher) => {
      fetch(`https://um6pconnectv2-production.up.railway.app/api/tags/user/${researcher._id}`)
        .then((res) => res.json())
        .then((data) => {
          setResearcherTags((prevTags) => ({
            ...prevTags,
            [researcher._id]: data.tags || [], // corrected here
          }));
        })
        .catch((err) => console.error("Failed to fetch tags for user:", err));
    });
  }, [savedResearchers]);

  const handleUnsaveResearcher = async (researcherId) => {
    try {
      await fetch("https://um6pconnectv2-production.up.railway.app/api/save/unsave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ researcherId }),
      });
      setSavedResearchers((prev) => prev.filter((r) => r._id !== researcherId));
    } catch (error) {
      console.error("Error unsaving researcher:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
        border: "1px solid #ddd",
        backgroundColor: "#FFF",
        borderRadius: "12px",
        backgroundClip: "padding-box",
        boxShadow: "none",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Saved Profiles
      </Typography>

      {loading ? (
        <Typography>Loading saved profiles...</Typography>
      ) : savedResearchers.length === 0 ? (
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
          <BookmarkBorderIcon sx={{ fontSize: 48, color: "#ea3b15", mb: 2 }} />
          <Typography fontWeight={600} color="#000">
            Your list is currently empty. When you save a profile, it appears here.
          </Typography>
        </Box>
      ) : (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                  <ListItemAvatar>
                    <Avatar src={researcher.profilePic} sx={{ width: 50, height: 50, border: "2px solid #ddd" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography fontWeight="bold" fontSize="16px">{researcher.Prenom} {researcher.Nom}</Typography>}
                    secondary={
                      <>
                        <Typography fontSize="14px" color="textSecondary">{researcher.headline}</Typography>
                        <Typography fontSize="14px" color="textSecondary">{researcher.Departement}</Typography>

                        {/* Tags */}
                        {researcherTags[researcher._id]?.length > 0 ? (
                          <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap" }}>
                            {researcherTags[researcher._id].map((tag, i) => (
                              <Button
                                key={i}
                                variant="outlined"
                                size="small"
                                sx={{
                                  borderRadius: 20,
                                  borderColor: "#ccc",
                                  color: "#3b444b",
                                  minWidth: "auto",
                                  px: 2,
                                  mx: 0.3,
                                  backgroundColor: "#f7f7f7",
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {tag}
                              </Button>
                            ))}
                          </Box>
                        ) : (
                          <Typography fontSize="14px" color="textSecondary">No tags available</Typography>
                        )}
                      </>
                    }
                  />
                </Box>

                <IconButton sx={{ color: "#ea3b15" }} onClick={() => handleUnsaveResearcher(researcher._id)}>
                  <BookmarkIcon />
                </IconButton>
              </ListItem>
              <Divider sx={{ bgcolor: "#eee", my: 1 }} />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SavedList;
