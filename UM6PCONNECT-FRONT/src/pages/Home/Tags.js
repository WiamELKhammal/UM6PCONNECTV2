import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Tags = ({ tags, selectedTag, onTagClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const uniqueTags = [...new Set(tags.map(tag => tag.name))];

  const getButtonStyles = (active) => ({
    backgroundColor: active ? "#e04c2c" : "#fff",
    color: active ? "#fff" : "#000",
    fontWeight: 600,
    border: "1px solid #ddd",
    borderRadius: "12px",
    px: 2.5,
    py: 1.3,
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: active ? "#d73a12" : "#f9f9f9",
    },
    fontSize: { xs: "12px", sm: "13px" },
  });

  const getMenuItemStyles = (active) => ({
    fontWeight: active ? 700 : 400,
    backgroundColor: active ? "#e04c2c" : "transparent",
    color: active ? "#fff" : "#000",
    "&:hover": {
      backgroundColor: active ? "#d73a12" : "#f5f5f5",
    }
  });

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1 }}>
      <Typography
        variant="body1"
        sx={{
          color: "#FFF",
          fontWeight: 600,
          fontSize: { xs: "14px", sm: "16px" },
          mr: 1,
        }}
      >
        Field Of Work:
      </Typography>

      {/* First 4 Tags */}
      {uniqueTags.slice(0, 4).map((tag) => (
        <Button
          key={tag}
          onClick={() => onTagClick(tag)}
          sx={getButtonStyles(selectedTag === tag)}
        >
          {tag}
        </Button>
      ))}

      {/* More Dropdown */}
      {uniqueTags.length > 4 && (
        <>
          <Button
            endIcon={<ExpandMoreIcon />}
            onClick={handleMoreClick}
            sx={getButtonStyles(false)}
          >
            More
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMoreClose}>
            {uniqueTags.slice(4).map((tag) => (
              <MenuItem
                key={tag}
                onClick={() => {
                  onTagClick(tag);
                  handleMoreClose();
                }}
                sx={getMenuItemStyles(selectedTag === tag)}
              >
                {tag}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};

export default Tags;
