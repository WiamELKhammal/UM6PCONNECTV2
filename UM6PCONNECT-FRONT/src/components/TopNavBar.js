import React, { useState, useContext } from "react";
import {
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import NotificationsList from "./Notifications/NotificationsList"; // import NotificationsList




const topNavItems = [
  { label: "HOME", to: "/" },
  { label: "WORK, LIVE & STUDY AT UM6P", to: "/StudyAndLiveAtUM6P" },
  { label: "OUR VISION 2030", to: "/OurVision" },
  { label: "FIELD OF WORK", to: "/OurFieldsOfWork" }, 
  { label: "MEET & ENGAGE WITH OUR RESEARCHERS", to: "/Our-Researchers" },
];

const profileNavItems = [
  { label: "OUR RESEARCHERS", to: "/Our-Researchers" },
  { label: "MESSAGES", to: "/messages" },
  { label: "NOTIFICATIONS", to: "#" }, // Notifications opens modal
  { label: "MY PROFILE", to: "/profile" },
];

const TopNavBar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleNavClick = (to) => {
    if (to === "#") {
      setNotificationAnchorEl(true); // open Notifications modal
    } else {
      setDrawerOpen(false);
    }
  };

  return (
    <>
      {/* Top bar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
          width: "100%",
          backgroundColor: "#FFF",
          borderBottom: "1px solid #CCC",
          px: { xs: 2, md: 8 },
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "'Work Sans', sans-serif",
          marginBottom: 0,
        }}
      >
        {/* Logo */}
        <Box component="img" src="logo.png" alt="Logo" sx={{ height: 26 }} />

        {/* Desktop nav */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flex: 1,
            justifyContent: "center",
            gap: 2,
          }}
        >
          {topNavItems.map((item, idx) => {
            const isActive =
              location.pathname === item.to ||
              (item.to === "/Our-Researchers" &&
                (location.pathname.startsWith("/Our-Researchers") ||
                  location.pathname.startsWith("/Userprofile")));

            return (
              <Stack
                key={idx}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  textAlign: "center",
                  whiteSpace: { xs: "normal", md: "nowrap" },
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: isActive ? "#ea3b15" : "#000",
                    flexShrink: 0,
                  }}
                />
                <Link
                  to={item.to}
                  style={{
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: 300,
                    color: isActive ? "#ea3b15" : "#000",
                  }}
                >
                  {item.label}
                </Link>
              </Stack>
            );
          })}
        </Box>

        {/* Burger (Mobile only) */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#CCC" }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 270, backgroundColor: "#FFF", height: "100%", color: "#000" }}>
          {/* Close button */}
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#CCC", mt: 1, ml: 1 }}>
            <CloseIcon />
          </IconButton>

          {/* Top links */}
          <List>
            {topNavItems.map((item, idx) => {
              const isActive =
                location.pathname === item.to ||
                (item.to === "/Our-Researchers" &&
                  (location.pathname.startsWith("/Our-Researchers") ||
                    location.pathname.startsWith("/Userprofile")));

              return (
                <ListItem
                  button
                  key={idx}
                  component={Link}
                  to={item.to}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      color: isActive ? "#ea3b15" : "#000",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ my: 1 }} />

          {/* Profile links if logged in */}
          {user ? (
            <List>
              {profileNavItems.map((item, idx) => (
                <ListItem
                  button
                  key={idx}
                  onClick={() => handleNavClick(item.to)}
                  component={item.to !== "#" ? Link : "div"}
                  to={item.to !== "#" ? item.to : undefined}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      color: location.pathname === item.to ? "#ea3b15" : "#000",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                  mb: 2,
                }}
              >
                Are you a UM6P researcher?
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Button
                  href="/signup"
                  variant="outlined"
                  sx={{
                    color: "#000",
                    borderColor: "#CCC",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  href="/signin"
                  variant="contained"
                  sx={{
                    backgroundColor: "#ea3b15",
                    color: "#FFF",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Notifications Modal */}
      {user && (
        <NotificationsList
          anchorEl={notificationAnchorEl}
          handleMenuClose={() => setNotificationAnchorEl(null)}
          userId={user._id}
        />
      )}
    </>
  );
};

export default TopNavBar;
