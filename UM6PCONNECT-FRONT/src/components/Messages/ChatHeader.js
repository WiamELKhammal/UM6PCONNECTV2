import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Popover,
  MenuItem,
  MenuList,
} from "@mui/material";
import { PhoneCall, Video, MoreVertical, Search, LayoutGrid } from "lucide-react";
import ArchiveChat from "./Actions/ArchiveChat";
import DeleteChat from "./Actions/DeleteChat";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import socket from "./socket"; // Import your Socket.IO instance

const ChatHeader = ({ recipient, onToggleSidebar }) => {
  const { user } = useContext(UserContext);
  const userId = user?._id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Fetch initial online status when component mounts
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/messages/user-status/${recipient?.userId}`);
        const data = await response.json();
        setIsRecipientOnline(data.isOnline);
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();

    // Listen for real-time status updates
    socket.on("updateUserStatus", ({ userId, status }) => {
      if (userId === recipient?.userId) {
        setIsRecipientOnline(status === "online");
      }
    });

    // Emit user connection event when component mounts
    if (user?._id) {
      socket.emit("userConnected", user._id);
    }

    // Cleanup listener and disconnect socket
    return () => {
      socket.off("updateUserStatus");
      socket.disconnect();
    };
  }, [user?._id, recipient?.userId]);

  // Smart lastSeen formatting
  const getLastSeenText = () => {
    if (isRecipientOnline) return "Online";

    const lastSeen = moment(recipient?.lastSeen);
    const now = moment();
    const diffInMinutes = now.diff(lastSeen, "minutes");
    const diffInHours = now.diff(lastSeen, "hours");

    if (!recipient?.lastSeen) return "Offline";
    if (diffInMinutes < 1) return "Last seen just now";
    if (diffInMinutes < 60) return `Online ${diffInMinutes} min ago`;
    if (diffInHours < 24) return `Online at ${lastSeen.format("HH:mm")}`;
    return `Online on ${lastSeen.format("DD MMM YYYY")}`;
  };

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
            {/* Online Indicator */}
            {isRecipientOnline && (
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
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography sx={{ color: "#1E1E1E", fontSize: "20px", fontWeight: "400" }}>
              {recipient?.Prenom || "Unknown"} {recipient?.Nom || "User"}
            </Typography>
            <Typography sx={{ fontSize: "15px", color: "#828282" }}>
              {getLastSeenText()}
            </Typography>
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

          <IconButton sx={{ color: "#ea3b15" }} onClick={onToggleSidebar}>
            <LayoutGrid size={22} />
          </IconButton>

          <IconButton
            sx={{ color: "#ea3b15", width: "38px", height: "38px", borderRadius: "50%" }}
            onClick={handleOpen}
          >
            <MoreVertical size={22} />
          </IconButton>
        </Box>

        {/* Popover */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 1 }}
        >
          <MenuList sx={{ boxShadow: "none" }}>
            <MenuItem onClick={() => { setArchiveOpen(true); handleClose(); }}>
              Archive Chat
            </MenuItem>
            <MenuItem onClick={() => { setDeleteOpen(true); handleClose(); }}>
              Delete Chat
            </MenuItem>
            <MenuItem onClick={handleClose}>View Profile</MenuItem>
          </MenuList>
        </Popover>
      </Box>

      {/* Modals */}
      <ArchiveChat
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        userId={userId}
        contactId={recipient?.userId}
      />
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