import React, { useState, useContext } from "react";
import {
  Box, Typography, Avatar, IconButton, Popover, MenuItem, MenuList
} from "@mui/material";
import { PhoneCall, Video, MoreVertical, Search, LayoutGrid } from "lucide-react";
import ArchiveChat from "./Actions/ArchiveChat";
import DeleteChat from "./Actions/DeleteChat";
import { UserContext } from "../../context/UserContext";

const ChatHeader = ({ recipient, onToggleSidebar }) => {
  const { user } = useContext(UserContext);
  const userId = user?._id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Handle popover open & close
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 25px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          height: "85px",
        }}
      >
        {/* Left Side - User Info */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={recipient?.profilePicture || "/assets/images/default-profile.png"}
              sx={{ width: 55, height: 55, marginRight: "16px" }}
            />
            {/* ✅ Online Indicator */}
            <Box
              sx={{
                width: "14px",
                height: "14px",
                backgroundColor: "#0ABF53",
                borderRadius: "50%",
                border: "2px solid #fbfbfc",
                position: "absolute",
                bottom: 5,
                right: 5,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography sx={{ color: "#1E1E1E", fontSize: "20px", fontWeight: "400" }}>
              {recipient?.Prenom || "Unknown"} {recipient?.Nom || "User"}
            </Typography>
            <Typography sx={{ fontSize: "15px", color: "#828282" }}>Online</Typography>
          </Box>
        </Box>

        {/* Right Side - Action Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "flex-end" }}>
          <IconButton sx={{ color: "#ea3b15" }}>
            <Search size={22} />
          </IconButton>

          <IconButton sx={{ color: "#ea3b15" }}>
            <Video size={22} />
          </IconButton>

          <IconButton sx={{ color: "#ea3b15" }}>
            <PhoneCall size={22} />
          </IconButton>

          {/* ✅ Open Right Sidebar */}
          <IconButton 
            sx={{ color: "#ea3b15" }} 
            onClick={onToggleSidebar} // ✅ Correctly trigger sidebar toggle
          >
            <LayoutGrid size={22} />
          </IconButton>

          {/* Three Dots Button - Opens Popover */}
          <IconButton
            sx={{ color: "#ea3b15", width: "38px", height: "38px", borderRadius: "50%" }}
            onClick={handleOpen}
          >
            <MoreVertical size={22} />
          </IconButton>
        </Box>

        {/* Popover (Dropdown Menu under the Dots) */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ mt: 1 }}
        >
          <MenuList sx={{ boxShadow: "none" }}>
            <MenuItem onClick={() => {
              setArchiveOpen(true);
              handleClose();
            }}>
              Archive Chat
            </MenuItem>
            <MenuItem onClick={() => {
              setDeleteOpen(true);
              handleClose();
            }}>
              Delete Chat
            </MenuItem>
            <MenuItem onClick={handleClose}>
              View Profile
            </MenuItem>
          </MenuList>
        </Popover>
      </Box>

      {/* ✅ Archive Chat Modal */}
      <ArchiveChat
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        userId={userId}
        contactId={recipient?.userId}
      />

      {/* ✅ Delete Chat Modal */}
      <DeleteChat
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        userId={userId}
        contactId={recipient?.userId}
      />
    </>
  );
};

export default ChatHeader;
