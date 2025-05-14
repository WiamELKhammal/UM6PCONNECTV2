import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Popover,
  MenuItem,
  MenuList,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const MyFriends = ({ onSelectConversation, setActiveTab }) => {
  const { user } = useContext(UserContext);
  const [following, setFollowing] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!user?._id) return;

    const fetchFollowing = async () => {
      try {
        const response = await axios.get(
          `https://um6pconnectv2-production.up.railway.app/api/follow/following/${user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setFollowing(response.data);
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };

    fetchFollowing();
  }, [user]);

  const handleOpenMenu = (event, friend) => {
    setAnchorEl(event.currentTarget);
    setSelectedFriend(friend);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFriend(null);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "350px" },
        height: "100vh",
        bgcolor: "#FFFFFF",
        borderRight: "1px solid #c8c9c9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with back arrow (mobile only) */}
      <Box sx={{ display: "flex", alignItems: "center", padding: "16px", gap: 1 }}>
        {isMobile && (
          <IconButton onClick={() => setActiveTab("chats")} size="small">
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#000",
            flexGrow: 1, // ✅ ensures title aligns left
          }}
        >
          My Friends
        </Typography>
      </Box>

      {/* Search Field */}
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search friends"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
          sx: {
            border: "1px solid #CCC",
            height: "40px",
            "& fieldset": { border: "none" },
          },
        }}
        sx={{ mb: 2, px: 2 }}
      />

      {/* Friends List */}
      <Box sx={{ flex: 1, overflowY: "auto", "&::-webkit-scrollbar": { display: "none" } }}>
        {following.length === 0 ? (
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", mt: 2 }}>
            You are not following anyone yet.
          </Typography>
        ) : (
          following
            .filter((friend) =>
              `${friend.following.Prenom} ${friend.following.Nom}`.toLowerCase().includes(search.toLowerCase())
            )
            .map((friend, index) => {
              const friendData = friend.following;

              return (
                <React.Fragment key={friendData._id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      py: 1.5,
                      justifyContent: "space-between",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#F9FAFB" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}>
                      <Avatar
                        src={friendData?.profilePicture || "/assets/images/default-profile.png"}
                        sx={{ width: 55, height: 55 }}
                      />
                      <Box>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#1E1E1E" }}>
                          {friendData.Prenom} {friendData.Nom}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#5F5F5F" }}>
                          {friendData.headline || "No headline"}
                        </Typography>
                      </Box>
                    </Box>

                    <IconButton onClick={(e) => handleOpenMenu(e, friendData)} sx={{ color: "#000" }}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                  {index < following.length - 1 && <Divider sx={{ height: "1px", bgcolor: "#DDD" }} />}
                </React.Fragment>
              );
            })
        )}
      </Box>

      {/* Popover menu */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1 }}
      >
        <MenuList sx={{ boxShadow: "none" }}>
          <MenuItem
            onClick={() => {
              window.location.href = `/Userprofile/${selectedFriend?._id}`;
              handleCloseMenu();
            }}
          >
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              onSelectConversation({
                userId: selectedFriend._id,
                Prenom: selectedFriend.Prenom,
                Nom: selectedFriend.Nom,
                profilePicture: selectedFriend.profilePicture,
              });
              handleCloseMenu();
            }}
          >
            Start a Chat
          </MenuItem>
        </MenuList>
      </Popover>
    </Box>
  );
};

export default MyFriends;
