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
  Chip,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import SearchBar2 from "../../components/SearchBar2.js";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Save from "../Save/Save";
import Follow from "../Follow/Follow";
import MessageModal from "../../components/Messages/MessageModal";
import ShareIcon from '@mui/icons-material/Share'; const RightSidebar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [researchers, setResearchers] = useState([]);
  const [filteredResearchers, setFilteredResearchers] = useState([]);
  const [tags, setTags] = useState([]);
  const [researcherTags, setResearcherTags] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResearcherId, setSelectedResearcherId] = useState(null);
  const [selectedResearcherName, setSelectedResearcherName] = useState("");

  // Fetch users & tags on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        const activeResearchers = data.filter(
          (u) => u.Status === "Active" && u._id !== user?._id
        );
        setResearchers(activeResearchers);
        setFilteredResearchers(activeResearchers);
      })
      .catch((err) => console.error("Failed to fetch users:", err));

    fetch("http://localhost:5000/api/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Failed to fetch tags:", err));
  }, [user]);

  // Fetch tags for each researcher
  useEffect(() => {
    const fetchTags = async () => {
      let tagsMap = {};
      for (const researcher of researchers) {
        try {
          const res = await fetch(`http://localhost:5000/api/tags/user/${researcher._id}`);
          const data = await res.json();
          tagsMap[researcher._id] = data.tags || [];
        } catch (err) {
          console.error(`Failed to fetch tags for user ${researcher._id}:`, err);
          tagsMap[researcher._id] = [];
        }
      }
      setResearcherTags(tagsMap);
    };

    if (researchers.length > 0) {
      fetchTags();
    }
  }, [researchers]);

  // Handle search
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
        // Exclude logged-in user from search results
        const filteredResults = data.filter(
          (researcher) => researcher._id !== user?._id
        );
        setFilteredResearchers(filteredResults);
      })
      .catch((err) => console.error("Failed to fetch users by tag:", err));
  };

  // Show all researchers
  const handleShowAll = () => {
    setFilteredResearchers(researchers);
  };

  // Handle message click
  const handleMessageClick = (researcherId, researcherName) => {
    setSelectedResearcherId(researcherId);
    setSelectedResearcherName(researcherName);
    setIsModalOpen(true);
  };

  return (
    <Box sx={{ flex: 1, bgcolor: "#fff", borderRadius: "10px", overflow: "hidden" }}>
      {/* Search Bar */}
      <SearchBar2 onSearch={handleSearch} tags={tags} onTagClick={handleTagClick} />

      {/* Title & Show All Users button */}
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, overflow: "hidden" }}>
                <ListItemAvatar>
                  <Avatar
                    src={researcher.profilePicture || "/assets/images/default-profile.png"}
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

                      {/* Tags Section (Below Bio) */}
                      {researcherTags[researcher._id] &&
                        researcherTags[researcher._id].length > 0 && (
                          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                            {researcherTags[researcher._id].map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                size="small"
                                sx={{
                                  bgcolor: "#f7f7f7",
                                  color: "#6e6e6e",
                                  fontSize: "11px",
                                  mt: 0.5,
                                  mr: 0.5,
                                  "&:hover": { bgcolor: "#ddd", cursor: "pointer" },
                                }}
                                onClick={() => handleTagClick(tag)}
                              />
                            ))}
                          </Box>
                        )}
                    </>
                  }
                />
              </Box>

              {/* Action Buttons */}

              <Box sx={{ display: "flex", gap: 1 }}>
                <Follow researcherId={researcher._id} user={user} />
                <Save researcherId={researcher._id} user={user} />
                <IconButton
                  sx={{ color: "#ea3b15" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessageClick(researcher._id, `${researcher.Prenom} ${researcher.Nom}`);
                  }}
                >
                  <ChatBubbleOutlineIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{ color: "#ea3b15" }} // Red color
                  onClick={(e) => e.stopPropagation()} // Add share functionality here if needed
                >
                  <ShareIcon fontSize="small" />
                </IconButton>
              </Box>

            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Message Modal */}
      {isModalOpen && (
        <MessageModal open={isModalOpen} onClose={() => setIsModalOpen(false)} recipientId={selectedResearcherId} recipientName={selectedResearcherName} />
      )}
    </Box>
  );
};

export default RightSidebar;
