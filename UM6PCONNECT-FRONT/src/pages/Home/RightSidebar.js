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
  Divider,
  Button,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { UserContext } from "../../context/UserContext";
import SearchBar2 from "../../components/SearchBar2";
import MessageModal from "../../components/Messages/MessageModal";
import Save from "../Save/Save";
import Follow from "../Follow/Follow";

const extractUsername = (url) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parsed.hostname.includes("linkedin.com")) {
      const index = parts.indexOf("in");
      return index !== -1 && parts.length > index + 1 ? parts[index + 1] : parsed.hostname;
    }
    if (parsed.hostname.includes("researchgate.net")) {
      const index = parts.indexOf("profile");
      return index !== -1 && parts.length > index + 1 ? parts[index + 1] : parsed.hostname;
    }
    return parts[parts.length - 1];
  } catch {
    return null;
  }
};

const InfoLine = ({ value, icon }) => {
  const username = extractUsername(value);
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      {value ? (
        <MuiLink
          href={value}
          target="_blank"
          rel="noopener"
          fontSize={16}
          color="#111827"
          underline="hover"
        >
          {username}
        </MuiLink>
      ) : (
        <Typography fontSize={16} color="#999">Not provided</Typography>
      )}
    </Box>
  );
};

const RightSidebar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [researchers, setResearchers] = useState([]);
  const [filteredResearchers, setFilteredResearchers] = useState([]);
  const [tags, setTags] = useState([]);
  const [researcherTags, setResearcherTags] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResearcherId, setSelectedResearcherId] = useState(null);
  const [selectedResearcherName, setSelectedResearcherName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users without token
        const resUsers = await fetch("https://um6pconnectv2-production.up.railway.app/api/users");
        const usersData = await resUsers.json();
  
        const activeResearchers = usersData.filter(
          (u) => u.Status === "Active" && u._id !== user?._id
        );
        setResearchers(activeResearchers);
        setFilteredResearchers(activeResearchers);
  
        // Fetch tags without token
        const resTags = await fetch("https://um6pconnectv2-production.up.railway.app/api/tags");
        const tagsData = await resTags.json();
        setTags(tagsData);
      } catch (err) {
        console.error("Error fetching users or tags:", err);
      }
    };
  
    fetchData();
  }, []); 
  
  useEffect(() => {
    const fetchTags = async () => {
      let tagsMap = {};
      for (const r of researchers) {
        try {
          const res = await fetch(`https://um6pconnectv2-production.up.railway.app/api/tags/user/${r._id}`);
          const data = await res.json();
          tagsMap[r._id] = data.tags || [];
        } catch {
          tagsMap[r._id] = [];
        }
      }
      setResearcherTags(tagsMap);
    };
  
    if (researchers.length > 0) fetchTags(); //  no more user?.token check
  }, [researchers]);
  
  
  const handleSearch = (query) => {
    const result = researchers.filter(
      (r) =>
        r.Prenom.toLowerCase().includes(query.toLowerCase()) ||
        r.Nom.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResearchers(result);
  };

  const handleTagClick = (tag) => {
    const clickedTag = typeof tag === "string" ? tag : tag.name; // normalize
  
    setSelectedTag(clickedTag); // update selection
  
    fetch(`https://um6pconnectv2-production.up.railway.app/api/tags/tag/${clickedTag}`)
      .then((res) => res.json())
      .then((data) =>
        setFilteredResearchers(data.filter((r) => r._id !== user?._id && r.Status === "Active"))
      )
      .catch((err) => console.error("Failed to fetch filtered researchers:", err));
  }
  const handleShowAll = () => {
    setSelectedTag(null);
    setFilteredResearchers(researchers.filter((r) => r._id !== user?._id));
  };

  const handleMessageClick = (id, name) => {
    setSelectedResearcherId(id);
    setSelectedResearcherName(name);
    setIsModalOpen(true);
  };

  return (
    <Box sx={{ flex: 1, bgcolor: "#fff", borderRadius: "10px", p: { xs: 2, sm: 3 } }}>
      <SearchBar2
        onSearch={handleSearch}
        tags={tags}
        onTagClick={handleTagClick}
        selectedTag={selectedTag}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="body1" sx={{ color: "#000", fontWeight: 600, fontSize: "20px" }}>
          Our Researchers:
        </Typography>
        <Button
          onClick={handleShowAll}
          variant="contained"
          sx={{
            color: "#000",
            fontWeight: 400,
            bgcolor: "#f7f7f7",
            border: "1px solid #CCC",
            borderRadius: "10px",
            boxShadow: "none",
            fontSize: { xs: "14px", sm: "16px" },
            "&:hover": { boxShadow: "none" },
          }}
        >
          All Researchers
        </Button>
      </Box>

      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filteredResearchers.map((r) => (
          <React.Fragment key={r._id}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                p: 2,
                bgcolor: "#FFF",
                border: "1px solid #CCC",
                borderRadius: "10px",
                cursor: "pointer",
                gap: 2,
              }}
              onClick={() => navigate(`/Userprofile/${r._id}`)}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}>
                <ListItemAvatar>
                  <Avatar
                    src={r.profilePicture || "/assets/images/default-profile.png"}
                    sx={{ width: 50, height: 50, border: "2px solid #ddd" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                      <Typography fontWeight="bold" fontSize="18px">
                        {r.Prenom} {r.Nom}
                      </Typography>
                      {r.badged && (
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                          sx={{
                            border: "1px dotted #ffbf00",
                            borderRadius: "12px",
                            px: 1,
                            py: 0.3,
                            backgroundColor: "#fff7d0",
                          }}
                        >
                          <WorkspacePremiumIcon sx={{ color: "#ffbf00", fontSize: 20 }} />
                          <Typography fontSize={14} color="#ffbf00">
                            Elite Member
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography fontSize={16} fontWeight={500} color="text.primary">
                        {r.headline || "No headline available"}
                      </Typography>
                      <Typography fontSize={16} color="text.secondary">
                        {r.Departement}
                      </Typography>

                      <Stack spacing={1} mt={1}>
                        {r.linkedIn && (
                          <InfoLine
                            value={r.linkedIn}
                            icon={<Box component="img" src="/assets/images/linkedin.svg" sx={{ width: 18, height: 18 }} />}
                          />
                        )}
                        {r.researchGate && (
                          <InfoLine
                            value={r.researchGate}
                            icon={<Box component="img" src="/assets/images/researchgate.svg" sx={{ width: 18, height: 18 }} />}
                          />
                        )}
                      </Stack>

                      {researcherTags[r._id]?.length > 0 && (
                        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                          {researcherTags[r._id].map((tag, i) => (
                            <Button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTagClick(tag);
                              }}
                              sx={{
                                fontSize: "14px",
                                py: 0.8,
                                px: 2,
                                m: 0.5,
                                borderRadius: "0px",
                                border: "1px solid #ea3b15",
                                backgroundColor: selectedTag === tag ? "#ea3b15" : "#fff",
                                color: selectedTag === tag ? "#fff" : "#ea3b15",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                "&:hover": {
                                  backgroundColor: selectedTag === tag ? "#d73a12" : "#fef6f5",
                                },
                              }}
                            >
                              {tag}
                            </Button>
                          ))}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </Box>

              <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mt: 2, gap: 1 }}>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessageClick(r._id, `${r.Prenom} ${r.Nom}`);
                  }}
                  startIcon={<ChatBubbleOutlineIcon />}
                  sx={{
                    border: "1px solid #ea3b15",
                    color: "#ea3b15",
                    textTransform: "none",
                    fontSize: "14px",
                    flex: 1,
                    "&:hover": { bgcolor: "transparent" },
                  }}
                >
                  Connect
                </Button>

                {user && (
                  <>
                    <Follow researcherId={r._id} user={user} />
                    <Save researcherId={r._id} user={user} />
                  </>
                )}
              </Box>
            </ListItem>
            <Divider sx={{ height: "1px", bgcolor: "#fff", my: 1 }} />
          </React.Fragment>
        ))}
      </List>

      {isModalOpen && (
        <MessageModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recipientId={selectedResearcherId}
          recipientName={selectedResearcherName}
        />
      )}
    </Box>
  );
};

export default RightSidebar;
