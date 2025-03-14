import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import SearchBar from "../../components/SearchBar.js";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Save from "../Save/Save"; // Import the Save component
import Follow from "../Follow/Follow"; // Import the Follow component

const RightSidebar = () => {
  const { user } = useContext(UserContext); // Get the logged-in user from context
  const [researchers, setResearchers] = useState([]);
  const [filteredResearchers, setFilteredResearchers] = useState([]);
  const [tags, setTags] = useState([]);
  const [researcherTags, setResearcherTags] = useState({}); // Store tags by researcher ID
  const navigate = useNavigate();

  // Fetch all users and tags on mount
  useEffect(() => {
    // Fetch all users and exclude the logged-in user
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        const activeResearchers = data.filter(
          (u) => u.Status === "Active" && u._id !== user?._id
        );
        setResearchers(activeResearchers);
        setFilteredResearchers(activeResearchers); // Initially show all users except the logged-in user
      })
      .catch((err) => console.error("Failed to fetch users:", err));

    // Fetch all tags
    fetch("http://localhost:5000/api/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Failed to fetch tags:", err));
  }, [user]);

  // Fetch tags for each researcher after researchers are loaded
  useEffect(() => {
    researchers.forEach((researcher) => {
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
  }, [researchers]);

  // Handle search query
  const handleSearch = (query) => {
    let filteredList = researchers;

    if (query) {
      filteredList = filteredList.filter(
        (researcher) =>
          researcher.Prenom.toLowerCase().includes(query.toLowerCase()) ||
          researcher.Nom.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredResearchers(filteredList);
  };

  // Handle tag click
  const handleTagClick = (tagName) => {
    fetch(`http://localhost:5000/api/tags/tag/${tagName}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredResearchers(data);
      })
      .catch((err) => console.error("Failed to fetch users by tag:", err));
  };

  // Show all researchers
  const handleShowAll = () => {
    setFilteredResearchers(researchers); // Reset the filter and show all users
  };

  return (
    <Box sx={{ flex: 1, bgcolor: "#fff", borderRadius: "10px", overflow: "hidden" }}>
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} tags={tags} onTagClick={handleTagClick} />

      {/* Title and Show All Users button aligned on the same line */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="body1" sx={{ color: "#000", fontWeight: "semi-bold", mr: 2 }}>
          Our Researchers:
        </Typography>
        <Button
          onClick={handleShowAll}
          variant="contained"
          sx={{
            color: "#000",
            fontWeight: "semi-bold",
            bgcolor: "#f7f7f7",
            border: "1px solid #CCC",
            borderRadius: "10px",
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          All Researchers
        </Button>
      </Box>

      {/* List of Researchers */}
      <List sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 1 }}>
        {filteredResearchers.map((researcher) => (
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
              onClick={() => navigate(`/Userprofile/${researcher._id}`)} // Navigate to profile
            >
              {/* Researcher Details */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={researcher.profilePic || "/assets/images/default-profile.png"}
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
                        {researcher.headline || "No headline available"}
                      </Typography>
                      <Typography fontSize="12px" color="textSecondary">
                        {researcher.Departement}
                      </Typography>
                      <Typography fontSize="12px" color="textSecondary">
                        {researcher.bio || "No bio available."}
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
                                handleTagClick(tag.name);
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

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 1 }}>
                {/* Follow Button */}
                <Follow researcherId={researcher._id} user={user} />
                {/* Save Button */}
                <Save researcherId={researcher._id} user={user} />
                {/* Chat Button */}
                <IconButton sx={{ color: "#d84b2b" }}>
                  <ChatBubbleOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default RightSidebar;