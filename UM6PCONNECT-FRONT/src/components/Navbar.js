import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { Home, Message, Notifications, KeyboardArrowDown } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";
import NotificationsList from "./Notifications/NotificationsList"; // Import NotificationsList
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null); // For profile menu
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null); // For notifications menu
  const [scrolled, setScrolled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // To store the unread notifications count

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`/api/notification/unreadCount/${user._id}`);
        setUnreadCount(response.data.count);
      } catch (error) {
        console.error("Error fetching unread notifications count:", error);
      }
    };

    if (user) {
      fetchUnreadCount();
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    window.location.href = "/signin";
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => setNotificationAnchorEl(null);

  const fullName = user ? `${user.Prenom} ${user.Nom}` : "Guest";

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "white",
        boxShadow: scrolled ? "0px 2px 10px rgba(0,0,0,0.1)" : "none",
        borderBottom: "1px solid #ddd",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 4 }}>
        {/* Logo */}
        <Box component="a" href="/" sx={{ display: "flex", alignItems: "center", ml: 7 }}>
          <img src="image.png" alt="Logo" width="180" height="80" />
        </Box>

        {/* Centered Icons with Reduced Gap */}
        <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
          {[{ icon: <Home />, label: "Home", link: "/" },
            { icon: <Message />, label: "Messages", link: "/messages" },
            { icon: <Notifications />, label: "Notifications", link: "#" }]
            .map(({ icon, label, link }) => (
              <Box key={label} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton
                  onClick={label === "Notifications" ? handleNotificationMenuOpen : null}
                  sx={{ color: "#404040" }}
                >
                  {icon}
                  {label === "Notifications" && unreadCount > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        backgroundColor: "#d84b2b",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                      }}
                    >
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </Box>
                  )}
                </IconButton>
                <Typography variant="caption" sx={{ color: "#707070" }}>
                  {label}
                </Typography>
              </Box>
            ))}
        </Box>

        {/* Profile Menu */}
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 3 }}>
            <Box
              onClick={handleProfileMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                border: "1px solid #CCC",
                borderRadius: "10px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <Avatar src={user?.profilePic || "/profile.png"} alt={fullName} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2" sx={{ fontWeight: "500", color: "#404040" }}>
                {fullName}
              </Typography>
              <KeyboardArrowDown sx={{ color: "#404040" }} />
            </Box>

            {/* Profile Menu Dropdown */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose} sx={{ mt: 1 }}>
              <Box sx={{ padding: "10px 20px", textAlign: "center" }}>
                <Avatar src={user?.profilePic || "/profile.png"} alt={fullName} sx={{ width: 50, height: 50, margin: "0 auto" }} />
                <Typography sx={{ fontWeight: "600", color: "#404040", mt: 1 }}>{fullName}</Typography>
                <Typography sx={{ fontSize: "12px", color: "#707070" }}>
                  Information systems and digital transformation engineering student
                </Typography>
                <Button
                  href="/profile"
                  variant="outlined"
                  sx={{
                    color: "#d84b2b",
                    borderColor: "#d84b2b",
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "none",
                    width: "100%",
                    mt: 1,
                    "&:hover": { backgroundColor: "#ffff" },
                  }}
                >
                  View Profile
                </Button>
              </Box>

              <Divider sx={{ my: 1 }} />
              <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#505050", px: 2, py: 0.5 }}>
                Account
              </Typography>
              <MenuItem sx={{ color: "#404040" }}>Settings & Privacy</MenuItem>
              <MenuItem sx={{ color: "#404040" }}>Help</MenuItem>
              <MenuItem sx={{ color: "#404040" }}>Language</MenuItem>

              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={handleLogout} sx={{ color: "#707070", justifyContent: "center", fontWeight: "500" }}>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <IconButton href="/signup" sx={{ color: "#404040" }}>
              <Typography variant="body2">Sign Up</Typography>
            </IconButton>

            <IconButton href="/signin" sx={{ color: "#d84b2b" }}>
              <Typography variant="body2">Sign In</Typography>
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Notification Dropdown */}
      {user && (
        <NotificationsList
          anchorEl={notificationAnchorEl}
          handleMenuClose={handleNotificationMenuClose}
          userId={user._id}
        />
      )}
    </AppBar>
  );
};

export default Navbar;
