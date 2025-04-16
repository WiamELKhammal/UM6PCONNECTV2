import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Button,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsList from "./Notifications/NotificationsList";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const { user, setUser,logoutUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/notification/unreadCount/${user._id}`)
        .then((res) => setUnreadCount(res.data.count))
        .catch((err) => console.error("Notification count error", err));
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    
  };

  const fullName = user ? `${user.Prenom} ${user.Nom}` : "Guest";
  const profilePic = user?.profilePicture || "/assets/images/default-profile.png";
  const headline = user?.headline || "No headline";

  const navItems = [
    { label: "OUR RESEARCHERS", link: "/Our-Researchers" },
    { label: "MESSAGES", link: "/messages" },
    { label: "NOTIFICATIONS", link: "#" },
    { label: "MY PROFILE", link: "/profile" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#181717",
        borderBottom: "1px solid #fff",
        color: "#f6f6f6",
        fontFamily: "'Work Sans', sans-serif",
        boxShadow: "none",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 3, md: 8 },
          py: 1.2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Spacer */}
        <Box sx={{ width: 220 }} />

        {/* Center Nav (only if logged in) */}
        {!isMobile && user && (
          <Stack direction="row" spacing={8} sx={{ fontFamily: "'Work Sans', sans-serif" }}>
            {navItems.map(({ label, link }) => {
              const isResearchersTab =
                link === "/Our-Researchers" &&
                (
                  location.pathname.startsWith("/Our-Researchers") ||
                  location.pathname.startsWith("/Userprofile")
                );

              const isActive = location.pathname === link || isResearchersTab;

              return (
                <Typography
                  key={label}
                  onClick={() => link !== "#" && navigate(link)}
                  sx={{
                    fontSize: "18px",
                    fontWeight: 300,
                    color: isActive ? "#e04c2c" : "#f6f6f6",
                    cursor: "pointer",
                    pb: 0,
                    mb: "-2px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {label}
                </Typography>
              );
            })}
          </Stack>
        )}

        {/* Right Side */}
        {user ? (
          <Box
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              px: 2,
              py: 1,
              border: "1px solid #FFF",
              "&:hover": { backgroundColor: "#222" },
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            <Avatar src={profilePic} sx={{ width: 32, height: 32 }} />
            <Typography sx={{ fontSize: 18, color: "#f6f6f6" }}>
              {fullName}
            </Typography>
            <KeyboardArrowDown sx={{ color: "#f6f6f6" }} />
          </Box>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{
              ml: "auto",
              pr: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#fff",
                fontFamily: "'Work Sans', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              Are you a UM6P researcher? Sign up or sign in to share your research with the world.
            </Typography>

            <Button
              href="/signup"
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #ccc",
                textTransform: "none",
                fontWeight: 400,
                fontSize: "16px",
                py: 1,
                px: 3,
                height: "42px",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                },
              }}
            >
              Sign Up
            </Button>

            <Button
              href="/signin"
              variant="contained"
              sx={{
                backgroundColor: "#e04c2c",
                color: "#fff",
                border: "1px solid #e04c2c",
                textTransform: "none",
                fontWeight: 400,
                fontSize: "16px",
                py: 1,
                px: 3,
                height: "42px",
                "&:hover": {
                  backgroundColor: "#fbeaea",
                  color: "#e04c2c",
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        )}
      </Toolbar>

      {/* Notifications */}
      {user && (
        <NotificationsList
          anchorEl={notificationAnchorEl}
          handleMenuClose={() => setNotificationAnchorEl(null)}
          userId={user._id}
        />
      )}

      {/* Profile Dropdown */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <Box sx={{ padding: "10px 20px", minWidth: 240 }}>
          <Avatar src={profilePic} sx={{ width: 50, height: 50, mx: "auto" }} />
          <Typography sx={{ mt: 1, fontWeight: 600, textAlign: "center" }}>
            {fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", textAlign: "center" }}>
            {headline}
          </Typography>
          <Button
            href="/profile"
            variant="outlined"
            fullWidth
            sx={{
              color: "#e04c2c",
              borderColor: "#e04c2c",
              mt: 2,
              fontWeight: 500,
              textTransform: "none",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            View Profile
          </Button>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ justifyContent: "center", color: "#e04c2c" }}>
          Sign Out
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
