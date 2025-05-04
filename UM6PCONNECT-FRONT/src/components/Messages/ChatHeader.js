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
import { ArrowBack } from "@mui/icons-material";
import { LayoutGrid, MoreVertical } from "lucide-react";
import ArchiveChat from "./Actions/ArchiveChat";
import DeleteChat from "./Actions/DeleteChat";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import socket from "./socket";

const ChatHeader = ({ recipient, onToggleSidebar, onBack, isMobile }) => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);
  const [lastSeenTime, setLastSeenTime] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!recipient?.userId || !user?.token) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/lastSeen/user-status/${recipient.userId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await res.json();
        setIsRecipientOnline(data.isOnline);
        setLastSeenTime(data.lastSeen);
      } catch (err) {
        console.error("Error fetching status:", err);
      }
    };

    fetchUserStatus();

    socket.on("updateUserStatus", ({ userId: uid, status }) => {
      if (uid === recipient?.userId) {
        setIsRecipientOnline(status === "online");
        if (status === "offline") setLastSeenTime(Date.now());
      }
    });

    return () => {
      socket.off("updateUserStatus");
    };
  }, [recipient?.userId, user?.token]);

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
      const interval = setInterval(() => {
        socket.emit("heartbeat", user._id);
      }, 30000);
      return () => {
        clearInterval(interval);
        socket.disconnect();
      };
    }
  }, [user?._id]);

  const getLastSeenText = () => {
    if (isRecipientOnline) return "Online";
    if (!lastSeenTime) return "Offline";
    const lastSeen = moment(Number(lastSeenTime));
    const now = moment();
    const diffMins = now.diff(lastSeen, "minutes");
    const diffHrs = now.diff(lastSeen, "hours");
    if (diffMins < 1) return "Last seen just now";
    if (diffMins < 60) return `Online ${diffMins} min ago`;
    if (diffHrs < 24) return `Online at ${lastSeen.format("HH:mm")}`;
    return `Online on ${lastSeen.format("DD MMM YYYY")}`;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
          height: "75px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {isMobile && (
            <IconButton onClick={onBack} sx={{ mr: 1, color: "#000" }}>
              <ArrowBack />
            </IconButton>
          )}

          <Box sx={{ position: "relative", mr: 2 }}>
            <Avatar
              src={recipient?.profilePicture || "/assets/images/default-profile.png"}
              sx={{ width: 48, height: 48 }}
            />
            {isRecipientOnline && (
              <Box
                sx={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#0ABF53",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "#1E1E1E",
                fontSize: "14px",
                fontWeight: "500",
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {recipient?.Prenom} {recipient?.Nom}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#828282" }}>
              {getLastSeenText()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={onToggleSidebar} sx={{ color: "#ea3b15" }}>
            <LayoutGrid size={20} />
          </IconButton>
          <IconButton onClick={handleOpen} sx={{ color: "#ea3b15" }}>
            <MoreVertical size={20} />
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
          <MenuList>
            <MenuItem onClick={() => { setArchiveOpen(true); handleClose(); }}>Archive Chat</MenuItem>
            <MenuItem onClick={() => { setDeleteOpen(true); handleClose(); }}>Delete Chat</MenuItem>
          </MenuList>
        </Popover>
      </Box>

      <ArchiveChat
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        userId={user?._id}
        contactId={recipient?.userId}
      />
      <DeleteChat
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        userId={user?._id}
        contactId={recipient?.userId}
      />
    </>
  );
};

export default ChatHeader;
