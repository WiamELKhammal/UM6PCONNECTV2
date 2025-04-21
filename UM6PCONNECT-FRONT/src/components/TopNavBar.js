import React, { useState } from "react";
import {
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "STUDY AND LIVE AT UM6P", to: "/StudyAndLiveAtUM6P" },
  { label: "OUR VISION 2030", to: "/OurVision" },
  { label: "MEET & ENGAGE WITH OUR RESEARCHERS", to: "/Our-Researchers" },
];

const TopNavBar = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
          width: "100%",
          backgroundColor: "#181717",
          borderBottom: "1px solid #fff",
          px: { xs: 2, md: 8 },
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        {/* Logo */}
        <Box component="img" src="image.png" alt="Logo" sx={{ height: 60 }} />

        {/* Centered Desktop Nav */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flex: 1,
            justifyContent: "center",
            gap: 4,
          }}
        >
          {navItems.map((item, idx) => {
            const isActive =
              location.pathname === item.to ||
              (item.to === "/Our-Researchers" &&
                (location.pathname.startsWith("/Our-Researchers") ||
                  location.pathname.startsWith("/Userprofile") ||
                  location.pathname.startsWith("/profile")));

            return (
              <Stack
                key={idx}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  maxWidth: "260px",
                  textAlign: "center",
                  whiteSpace: {
                    xs: "normal", // allow wrapping on small screens
                    md: "nowrap", // no wrapping on desktop
                  },
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: isActive ? "#e04c2c" : "#fff",
                    flexShrink: 0,
                  }}
                />
                <Link
                  to={item.to}
                  style={{
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: 300,
                    color: isActive ? "#e04c2c" : "#f6f6f6",
                  }}
                >
                  {item.label}
                </Link>
              </Stack>
            );
          })}
        </Box>

        {/* Mobile Hamburger */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, backgroundColor: "#181717", height: "100%", color: "#fff" }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff", mt: 1, ml: 1 }}>
            <CloseIcon />
          </IconButton>
          <List>
            {navItems.map((item, idx) => {
              const isActive =
                location.pathname === item.to ||
                (item.to === "/Our-Researchers" &&
                  (location.pathname.startsWith("/Our-Researchers") ||
                    location.pathname.startsWith("/Userprofile") ||
                    location.pathname.startsWith("/profile")));

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
                      color: isActive ? "#e04c2c" : "#f6f6f6",
                      fontSize: "16px",
                      fontWeight: 300,
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopNavBar;
