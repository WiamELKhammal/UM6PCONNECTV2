// ===========================
// ChatHeader.jsx (FRONTEND)
// ===========================
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
import { PhoneCall, Video, MoreVertical, LayoutGrid } from "lucide-react";
import ArchiveChat from "./Actions/ArchiveChat";
import DeleteChat from "./Actions/DeleteChat";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import socket from "./socket";

const ChatHeader = ({ recipient, onToggleSidebar }) => {
  const { user } = useContext(UserContext);
  const userId = user?._id;

  const [anchorEl, setAnchorEl] = useState(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);
  const [lastSeenTime, setLastSeenTime] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/lastSeen/user-status/${recipient?.userId}`);
        const data = await response.json();
        console.log("[User Status API] Status fetched:", data);
        setIsRecipientOnline(data.isOnline);
        setLastSeenTime(data.lastSeen);
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();

    socket.on("updateUserStatus", ({ userId: updatedUserId, status }) => {
      if (updatedUserId === recipient?.userId) {
        console.log(`[Socket] updateUserStatus received for ${updatedUserId}: ${status}`);
        setIsRecipientOnline(status === "online");
        if (status === "offline") {
          setLastSeenTime(Date.now());
        }
      }
    });

    return () => {
      socket.off("updateUserStatus");
      console.log("[Socket] disconnected");
    };
  }, [recipient?.userId]);

  useEffect(() => {
    if (user?._id) {
      console.log("[Socket] join emitted:", user._id);
      socket.emit("join", user._id);

      const heartbeat = setInterval(() => {
        console.log("[Socket] heartbeat emitted:", user._id);
        socket.emit("heartbeat", user._id);
      }, 30000);

      return () => {
        clearInterval(heartbeat);
        socket.disconnect();
      };
    }
  }, [user?._id]);

  const getLastSeenText = () => {
    if (isRecipientOnline) return "Online";
    if (!lastSeenTime) return "Offline";

    const lastSeen = moment(Number(lastSeenTime));
    const now = moment();
    const diffInMinutes = now.diff(lastSeen, "minutes");
    const diffInHours = now.diff(lastSeen, "hours");

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
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={recipient?.profilePicture || "/assets/images/default-profile.png"}
              sx={{ width: 55, height: 55, marginRight: "16px" }}
            />
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

        <Box sx={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "flex-end" }}>
          <IconButton sx={{ color: "#e04c2c" }}><Video size={22} /></IconButton>
          <IconButton sx={{ color: "#e04c2c" }}><PhoneCall size={22} /></IconButton>
          <IconButton sx={{ color: "#e04c2c" }} onClick={onToggleSidebar}><LayoutGrid size={22} /></IconButton>
          <IconButton
            sx={{ color: "#e04c2c", width: "38px", height: "38px", borderRadius: "50%" }}
            onClick={handleOpen}
          >
            <MoreVertical size={22} />
          </IconButton>
        </Box>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 1 }}
        >
          <MenuList sx={{ boxShadow: "none" }}>
            <MenuItem onClick={() => { setArchiveOpen(true); handleClose(); }}>Archive Chat</MenuItem>
            <MenuItem onClick={() => { setDeleteOpen(true); handleClose(); }}>Delete Chat</MenuItem>
          </MenuList>
        </Popover>
      </Box>

      <ArchiveChat open={archiveOpen} onClose={() => setArchiveOpen(false)} userId={userId} contactId={recipient?.userId} />
      <DeleteChat open={deleteOpen} onClose={() => setDeleteOpen(false)} userId={userId} contactId={recipient?.userId} />
    </>
  );
};

export default ChatHeader;
