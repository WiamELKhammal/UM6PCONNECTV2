import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Divider,
  Typography,
  Box,
  Avatar,
  Tooltip,
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { formatDistanceToNow, format } from "date-fns";
import { useTheme } from "@mui/material/styles";

const NotificationsList = ({ anchorEl, handleMenuClose, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/notification/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const markAllAsRead = async () => {
    try {
      await axios.put(`http://localhost:5000/api/notification/markAllAsRead/${userId}`);
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:5000/api/notification/mark-as-read/${notificationId}`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const content = (
    <Box sx={{ width: isMobile ? "100%" : 400, maxHeight: 500, overflowY: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1.5,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Notifications
        </Typography>
        <Tooltip title="Mark all as read">
          <Typography
            variant="body2"
            sx={{
              color: "#e04c2c",
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={markAllAsRead}
          >
            Mark All as Read
          </Typography>
        </Tooltip>
      </Box>

      {/* Loading */}
      {isLoading && (
        <MenuItem disabled>
          <Typography>Loading notifications...</Typography>
        </MenuItem>
      )}

      {/* Empty */}
      {!isLoading && notifications.length === 0 && (
        <Box
          sx={{
            py: 4,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: "#707070", fontWeight: 500 }}>
            No new notifications
          </Typography>
        </Box>
      )}

      {/* List */}
      {notifications.map((notification) => (
        <MenuItem
          key={notification._id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            py: 2,
            px: 2,
            borderBottom: "1px solid #eee",
            backgroundColor: notification.isRead ? "transparent" : "#f9f9f9",
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
          onClick={() => markAsRead(notification._id)}
        >
          <Avatar
            src={notification.senderId?.profilePicture || "/assets/images/default-profile.png"}
            alt={`${notification.senderId?.Prenom} ${notification.senderId?.Nom}`}
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#000",
                fontWeight: 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {notification.senderId?.Prenom} {notification.senderId?.Nom}
              <span style={{ color: "#666", fontWeight: 400, marginLeft: 6 }}>
                started following you
              </span>
            </Typography>
            <Typography variant="caption" sx={{ color: "#707070", fontSize: "12px" }}>
              {notification.createdAt &&
                (new Date() - new Date(notification.createdAt) < 24 * 60 * 60 * 1000
                  ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
                  : format(new Date(notification.createdAt), "MM/dd/yyyy"))}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Box>
  );

  return isMobile ? (
    <Dialog fullWidth open={Boolean(anchorEl)} onClose={handleMenuClose} scroll="paper">

      {content}
    </Dialog>
  ) : (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          width: 400,
          borderRadius: 2,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {content}
    </Menu>
  );
};

export default NotificationsList;
