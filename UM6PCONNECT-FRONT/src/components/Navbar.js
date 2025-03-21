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
  Badge,
} from "@mui/material";
import { Home, Message, Notifications, KeyboardArrowDown } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";
import NotificationsList from "./Notifications/NotificationsList";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Add React Router imports

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUnreadCount = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/notification/unreadCount/${user._id}`);
          setUnreadCount(response.data.count);
        } catch (error) {
          console.error("Error fetching unread notifications count", error);
        }
      };
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
  const profilePic = user?.profilePicture || "/assets/images/default-profile.png";
  const headline = user?.headline || "No headline available";

  return (
    <AppBar
      position="fixed"
      sx={{
        fontFamily: "'Inter', Arial, sans-serif",
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "white",
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

        {/* Centered Icons */}
        <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
          {[{ icon: <Home />, label: "Home", link: "/our-researchers" }, // Updated the link here
            { icon: <Message />, label: "Messages", link: "/messages" },
            { icon: <Notifications />, label: "Notifications", link: "#" }].map(({ icon, label, link }) => (
              <Box key={label} sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                <IconButton
                  onClick={label === "Notifications" ? handleNotificationMenuOpen : () => navigate(link)} // Use navigate for other links
                  sx={{
                    color: "#404040",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  <Badge
                    badgeContent={label === "Notifications" ? unreadCount : 0}
                    color="error"
                    sx={{ "& .MuiBadge-dot": { backgroundColor: "#ea3b15" } }}
                  >
                    {icon}
                  </Badge>
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
              <Avatar src={profilePic} alt={fullName} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2" sx={{ fontWeight: "500", color: "#404040" }}>
                {fullName}
              </Typography>
              <KeyboardArrowDown sx={{ color: "#404040" }} />
            </Box>

            {/* Profile Menu Dropdown */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose} sx={{ mt: 1 }}>
              <Box sx={{ padding: "10px 20px", textAlign: "center", minWidth: 280 }}>
                <Avatar src={profilePic} alt={fullName} sx={{ width: 50, height: 50, margin: "0 auto" }} />
                <Typography sx={{ fontWeight: "600", color: "#404040", mt: 1 }}>{fullName}</Typography>
                
                {/* Headline Here */}
                <Typography sx={{ fontSize: "12px", color: "#707070" }}>
                  {headline}
                </Typography>

                <Button
                  href="/profile"
                  variant="outlined"
                  sx={{
                    color: "#ea3b15",
                    borderColor: "#ea3b15",
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
            <Button href="/signup" sx={{ color: "#404040", textTransform: "none" }}>
              Sign Up
            </Button>
            <Button href="/signin" sx={{ color: "#ea3b15", textTransform: "none" }}>
              Sign In
            </Button>
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
