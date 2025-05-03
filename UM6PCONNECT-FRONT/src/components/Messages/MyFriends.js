import React, { useState, useEffect, useContext } from "react";
import {
  Box, Typography, Avatar, TextField, InputAdornment, IconButton, Divider, Popover, MenuItem, MenuList
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const MyFriends = ({ onSelectConversation }) => {
  const { user } = useContext(UserContext);
  const [following, setFollowing] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/follow/following/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
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
    <Box sx={{ width: "350px", height: "100vh", bgcolor: "#FFFFFF", borderRight: "1px solid #c8c9c9" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>My Friends</Typography>
      </Box>

      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search friends"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
          sx: { border: "1px solid #CCC", height: "40px", "& fieldset": { border: "none" } },
        }}
        sx={{ marginBottom: "1rem", padding: "0px 16px" }}
      />

      {following.length === 0 ? (
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", marginTop: "20px" }}>
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
                    padding: "14px 20px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#F9FAFB" },
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}>
                    <Avatar src={friendData?.profilePicture || "/assets/images/default-profile.png"} sx={{ width: 55, height: 55 }} />
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
