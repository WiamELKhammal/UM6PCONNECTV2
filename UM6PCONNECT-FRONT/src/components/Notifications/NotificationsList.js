import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Divider,
  Typography,
  Box,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { formatDistanceToNow, format } from "date-fns"; // Importing date-fns for time formatting

const NotificationsList = ({ anchorEl, handleMenuClose, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      // API call to mark a specific notification as read
      await axios.put(`http://localhost:5000/api/notification/mark-as-read/${notificationId}`);

      // Update notification state to reflect the 'read' status
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      sx={{
        maxHeight: 400,
        marginTop: "25px",
        marginLeft: "-180px",
        overflowY: "auto",
        "& .MuiPaper-root": {
          borderRadius: "12px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* Notification Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "500", fontSize: "18px", color: "#000" }}>
          Notifications
        </Typography>
        <Tooltip title="Mark all as read">
          <Typography
            variant="body2"
            sx={{
              color: "#d84b2b",
              fontWeight: "semi-bold",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={markAllAsRead}
          >
            Mark All as Read
          </Typography>
        </Tooltip>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <MenuItem disabled>
          <Typography>Loading notifications...</Typography>
        </MenuItem>
      )}

      {/* Empty State */}
      {!isLoading && notifications.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 200,
            textAlign: "center",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "semi_bold", color: "#707070" }}>
            No new notifications
          </Typography>
        </Box>
      )}

      {/* Notifications List */}
      {notifications.map((notification) => (
        <MenuItem
          key={notification._id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderBottom: "1px solid #ddd",
            backgroundColor: notification.isRead ? "transparent" : "#f9f9f9",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
          onClick={() => markAsRead(notification._id)} // Mark the notification as read when clicked
        >
          {/* User Avatar */}
          <Avatar
            src={notification.senderId?.profilePic || "/assets/images/default-profile.png"}
            alt={`${notification.senderId?.Prenom} ${notification.senderId?.Nom}`}
            sx={{
              width: 40,
              height: 40,
              border: "2px solid #ddd",
            }}
          />

          {/* Notification Content */}
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "semi-bold",
                color: "#000",
                mb: 0.5,
                whiteSpace: "nowrap", // Prevents wrapping
              }}
            >
              {notification.senderId?.Prenom} {notification.senderId?.Nom}{" "}
              <span style={{ color: "#666", fontWeight: "semi-bold", fontSize: "16px" }}>
                started following you
              </span>
            </Typography>
          </Box>

          {/* Time or Date */}
          <Typography
            variant="caption"
            sx={{
              color: "#707070",
              fontSize: "12px",
              textAlign: "right",
            }}
          >
            {notification.createdAt &&
              (new Date() - new Date(notification.createdAt) < 24 * 60 * 60 * 1000
                ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
                : format(new Date(notification.createdAt), "MM/dd/yyyy"))}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NotificationsList;
