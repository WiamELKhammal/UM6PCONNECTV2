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
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsList from "./Notifications/NotificationsList";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    if (user?.token) {
      axios
        .get("https://um6pconnectv2-production.up.railway.app/api/notification/unreadCount", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
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


  const handleNavClick = (link, event) => {
    if (link === "#") {
      setNotificationAnchorEl(event.currentTarget);
    } else {
      navigate(link);
    }
  };
  
  const isActive = (link) => {
    if (link === "/Our-Researchers") {
      return location.pathname.startsWith("/Our-Researchers") || location.pathname.startsWith("/Userprofile");
    }
    if (link === "#") return false;
    return location.pathname === link;
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#FFF",
        borderBottom: "1px solid #CCC",
        color: "#000",
        fontFamily: "'Work Sans', sans-serif",
        boxShadow: "none",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 8 },
          py: { xs: 0.5, md: 1.2 },
          minHeight: { xs: "56px", md: "auto" },
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
        }}
      >
        {/* Left Empty Space or Logo */}
        <Box sx={{ width: { xs: "auto", md: 220 } }} />

        {/* Middle Section */}
        {user ? (
          !isMobile && (
            <Stack direction="row" spacing={8} alignItems="center">
              {navItems.map(({ label, link }, index) => (
                <Typography
                  key={index}
                  onClick={(e) => handleNavClick(link, e)}
                  sx={{
                    fontSize: 18,
                    fontWeight: 300,
                    color: isActive(link) ? "#ea3b15" : "#000",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {label === "NOTIFICATIONS" && unreadCount > 0
                    ? `NOTIFICATIONS (${unreadCount})`
                    : label}
                </Typography>
              ))}
            </Stack>
          )
        ) : (
          !isMobile && (
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#000",
                }}
              >
                Are you a UM6P researcher?
              </Typography>
              <Button
                href="/signup"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderColor: "#ccc",
                  color: "#000",
                  fontSize: 14,
                  px: 2,
                  py: 0.5,
                }}
              >
                Sign Up
              </Button>
              <Button
                href="/signin"
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#ea3b15",
                  fontSize: 14,
                  px: 2,
                  py: 0.5,
                }}
              >
                Sign In
              </Button>
            </Stack>
          )
        )}

        {/* Right: Profile (always visible if user) */}
        {user && (
          <Box
            onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              px: { xs: 1.5, md: 2 },
              py: { xs: 0.8, md: 1 },
              border: "1px solid #CCC",
              backgroundColor: "#fff",
              borderRadius: 1,
              color: "#000",
            }}
          >
            <Avatar src={profilePic} sx={{ width: 32, height: 32 }} />
            <Typography sx={{ fontSize: { xs: 16, md: 18 } }}>{fullName}</Typography>
            <KeyboardArrowDown />
          </Box>
        )}
      </Toolbar>

      {/* Notifications Modal */}
      {user && (
        <NotificationsList
          anchorEl={notificationAnchorEl}
          handleMenuClose={() => setNotificationAnchorEl(null)}
          userId={user._id}
        />
      )}

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={() => setProfileMenuAnchor(null)}
        PaperProps={{ sx: { width: 280, mt: 0 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ padding: 2 }}>
          <Avatar src={profilePic} sx={{ width: 50, height: 50, mx: "auto" }} />
          <Typography sx={{ mt: 1, fontWeight: 600, textAlign: "center" }}>{fullName}</Typography>
          <Typography variant="body2" sx={{ color: "#999", textAlign: "center" }}>
            {headline}
          </Typography>
          <Button
            href="/profile"
            variant="outlined"
            fullWidth
            sx={{
              color: "#ea3b15",
              borderColor: "#ea3b15",
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
        <MenuItem onClick={handleLogout} sx={{ justifyContent: "center", color: "#ea3b15" }}>
          Sign Out
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
