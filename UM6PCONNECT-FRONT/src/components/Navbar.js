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
  Drawer,
  useMediaQuery,
} from "@mui/material";
import {
  KeyboardArrowDown,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { UserContext } from "../context/UserContext";
import NotificationsList from "./Notifications/NotificationsList";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  HouseIcon,
  MessageSquareTextIcon,
  BellDotIcon,
  UserIcon,
} from "lucide-react";
import { BookIcon } from "lucide-react";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user?.token) {
      const fetchUnreadCount = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/notification/unreadCount",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
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
  const profilePic =
    user?.profilePicture || "/assets/images/default-profile.png";
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
        <Box component="a" href="/" sx={{ display: "flex", alignItems: "center" }}>
          <img src="logo.png" alt="Logo" width="180" height="80" />
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            {[
              
                {
                  icon: <HouseIcon stroke="#000" strokeWidth={1.5} size={22} />,
                  label: "Home",
                  link: "/our-researchers",
                },
                {
                  icon: <MessageSquareTextIcon stroke="#000" strokeWidth={1.5} size={22} />,
                  label: "Messages",
                  link: "/messages",
                },
                {
                  icon: <BellDotIcon stroke="#000" strokeWidth={1.5} size={22} />,
                  label: "Notifications",
                  link: "#",
                },
                {
                  icon: <BookIcon stroke="#000" strokeWidth={1.5} size={22} />,
                  label: "Programs",
                  link: "/our-programs",
                },
                {
                  icon: <UserIcon stroke="#000" strokeWidth={1.5} size={22} />,
                  label: "Profile",
                  link: "/profile",
                },
              

            ].map(({ icon, label, link }) => {
              const isActive =
                location.pathname === link ||
                (label === "Notifications" && notificationAnchorEl);
              const isNotifications = label === "Notifications";

              return (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderBottom: isActive
                      ? "2px solid #000"
                      : "2px solid transparent",
                    pb: "4px",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <IconButton
                    onClick={
                      isNotifications
                        ? handleNotificationMenuOpen
                        : () => navigate(link)
                    }
                    sx={{
                      color: isActive ? "#000" : "#666",
                      transition: "transform 0.2s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {isNotifications ? (
                      <Badge badgeContent={unreadCount} color="error">
                        {icon}
                      </Badge>
                    ) : (
                      icon
                    )}
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isActive ? "#000" : "#666",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}

        {/* Profile or Burger Menu */}
        {user ? (
          isMobile ? (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon sx={{ color: "#404040" }} />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                <Avatar
                  src={profilePic}
                  alt={fullName}
                  sx={{ width: 32, height: 32 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "500", color: "#404040" }}
                >
                  {fullName}
                </Typography>
                <KeyboardArrowDown sx={{ color: "#404040" }} />
              </Box>
            </Box>
          )
        ) : (
          <Box>
            <Button
              href="/signup"
              sx={{ color: "#404040", textTransform: "none" }}
            >
              Sign Up
            </Button>
            <Button
              href="/signin"
              sx={{ color: "#ea3b15", textTransform: "none" }}
            >
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

      {/* Profile Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        sx={{ mt: 1 }}
      >
        <Box sx={{ padding: "10px 20px", textAlign: "center", minWidth: 280 }}>
          <Avatar
            src={profilePic}
            alt={fullName}
            sx={{ width: 50, height: 50, margin: "0 auto" }}
          />
          <Typography sx={{ fontWeight: "600", color: "#404040", mt: 1 }}>
            {fullName}
          </Typography>
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
              "&:hover": { backgroundColor: "#fff" },
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
        <MenuItem
          onClick={handleLogout}
          sx={{ color: "#707070", justifyContent: "center", fontWeight: "500" }}
        >
          Sign Out
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Avatar
              src={profilePic}
              alt={fullName}
              sx={{ width: 64, height: 64, margin: "0 auto" }}
            />
            <Typography sx={{ mt: 1, fontWeight: "600" }}>
              {fullName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {headline}
            </Typography>
          </Box>

          {[
            { label: "Home", link: "/our-researchers" },
            { label: "Messages", link: "/messages" },
            {
              label: "Notifications",
              link: "#",
              onClick: () => {
                handleNotificationMenuOpen({ currentTarget: document.body });
                toggleDrawer();
              },
              badge: unreadCount,
            },
            { label: "Profile", link: "/profile" },
          ].map(({ label, link, onClick, badge }) => (
            <MenuItem
              key={label}
              onClick={() => {
                if (onClick) {
                  onClick();
                } else {
                  navigate(link);
                  toggleDrawer();
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography sx={{ flexGrow: 1 }}>{label}</Typography>
                {badge ? (
                  <Badge badgeContent={badge} color="error" sx={{ mr: 1 }} />
                ) : null}
              </Box>
            </MenuItem>
          ))}

          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={handleLogout}
            sx={{ color: "#ea3b15", fontWeight: 500 }}
          >
            Sign Out
          </MenuItem>
        </Box>
      </Drawer>

    </AppBar>
  );
};

export default Navbar;
