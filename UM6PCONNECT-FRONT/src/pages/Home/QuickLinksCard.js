import React from "react";
import {
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
const QuickLinksCard = () => {
  const navigate = useNavigate();

  const links = [
    { label: "Saved Profiles", icon: <BookmarkIcon />, path: "/saved" },
    { label: "Followers", icon: <PeopleAltIcon />, path: "/followers" },
    { label: "Following", icon: <PeopleAltIcon />, path: "/following" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: 360,
          borderRadius: 3,
          boxShadow: "none",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ padding: 2 }}>


          <List sx={{ padding: 0 }}>
            {links.map(({ label, icon, path }) => (
              <ListItemButton
                key={label}
                onClick={() => navigate(path)}
                sx={{
                  borderRadius: 2,
                  px: 1,
                  mb: 1,
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#e04c2c", minWidth: 36 }}>{icon}</ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: "15px", color: "#222" }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Card>
    </div>
  );
};

export default QuickLinksCard;
