import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";

const Navbar = () => {
  
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    console.log("Navbar - User from Context:", user);
    const storedUser = localStorage.getItem("user");
    console.log("Navbar - User from localStorage:", storedUser);
    
    if (!user && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("Navbar - User set from localStorage:", parsedUser);
      } catch (error) {
        console.error("Navbar - Error parsing user from localStorage:", error);
      }
    }
  }, [user, setUser]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    setUser(null);
    window.location.href = "/signin";
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fullName = user ? `${user.Prenom} ${user.Nom}` : "Guest";

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", borderBottom: "1px solid #ddd" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", paddingX: 4 }}>
        {/* Logo */}
        <Box component="a" href="/" sx={{ display: "flex", alignItems: "center", marginLeft: 7 }}>
          <img src="image.png" alt="Logo" width="180" height="80" />
        </Box>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Profil utilisateur avec menu déroulant */}
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "8px 12px",
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
              <KeyboardArrowDownIcon sx={{ color: "#404040" }} />
            </Box>

            {/* Menu déroulant */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ mt: 1 }}>
              {/* Section Profil */}
              <Box sx={{ padding: "10px 20px", textAlign: "center" }}>
                <Avatar src={user?.profilePic || "/profile.png"} alt={fullName} sx={{ width: 50, height: 50, margin: "0 auto" }} />
                <Typography sx={{ fontWeight: "600", color: "#404040", mt: 1 }}>{fullName}</Typography>
                <Typography sx={{ fontSize: "12px", color: "#707070" }}>Information systems and digital transformation engineering student</Typography>
                <Button
                  href="/pages/MyProfile"
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

              {/* Section Account */}
              <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#505050", px: 2, py: 0.5 }}>Account</Typography>
              <MenuItem sx={{ color: "#404040" }}>Settings & Privacy</MenuItem>
              <MenuItem sx={{ color: "#404040" }}>Help</MenuItem>
              <MenuItem sx={{ color: "#404040" }}>Language</MenuItem>

              <Divider sx={{ my: 1 }} />

              {/* Bouton Sign Out */}
              <MenuItem onClick={handleLogout} sx={{ color: "#707070", justifyContent: "center", fontWeight: "500" }}>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Tooltip title="Only researchers can create an account" arrow>
              <Button
                href="/signup"
                sx={{
                  color: "#404040",
                  fontSize: "16px",
                  fontWeight: "500",
                  textTransform: "none",
                  padding: "8px 20px",
                  marginRight: 2,
                  "&:hover": { backgroundColor: "#f8f4f4", color: "black" },
                }}
              >
                Sign Up
              </Button>
            </Tooltip>

            <Tooltip title="Only researchers can log in" arrow>
              <Button
                href="/signin"
                variant="outlined"
                sx={{
                  color: "#d84b2b",
                  borderColor: "#d84b2b",
                  fontSize: "16px",
                  fontWeight: "500",
                  textTransform: "none",
                  marginRight: 4,
                  padding: "8px 20px",
                  "&:hover": { backgroundColor: "#d84b2b", color: "white" },
                }}
              >
                Sign In
              </Button>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
