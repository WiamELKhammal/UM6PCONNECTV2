import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Tags = ({ tags, onTagClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Remove duplicates by converting the tags array to a Set and back to an array
  const uniqueTags = [...new Set(tags.map(tag => tag.name))];

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body1" sx={{ color: "#000", fontWeight: "semi-bold", mr: 2 }}>
        Tags:
      </Typography>

      {uniqueTags.slice(0, 4).map((tag) => (
        <Button
          key={tag}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 20,
            borderColor: "#f7f7f7",
            color: "#6e6e6e ",
            minWidth: "auto",
            px: 2,
            mx: 0.3,
            backgroundColor: "#f7f7f7",
            "&:hover": {
              backgroundColor: "#fafafa",
              borderColor: "#f7f7f7",
            },
          }}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </Button>
      ))}

      {/* More Dropdown */}
      <Button
        variant="outlined"
        size="small"
        endIcon={<ExpandMoreIcon />}
        onClick={handleClick}
        sx={{
          borderRadius: 20,
          borderColor: "#f7f7f7",
          color: "#6e6e6e ",
          minWidth: "auto",
          px: 2,
          mx: 0.3,
          backgroundColor: "#f7f7f7",
          "&:hover": {
            backgroundColor: "#fafafa",
            borderColor: "#f7f7f7",
          },
        }}
      >
        More
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {uniqueTags.slice(4).map((tag) => (
          <MenuItem key={tag} onClick={() => { onTagClick(tag); handleClose(); }}>
            {tag}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Tags;
