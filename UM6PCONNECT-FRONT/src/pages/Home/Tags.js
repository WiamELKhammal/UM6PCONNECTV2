import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Tags = ({ tags, selectedTag, onTagClick }) => {
  const uniqueTags = [...new Set(tags.map((tag) => tag.name))];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        my: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "18px",
          color: "#000",
        }}
      >
        Field Of Work:
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        {uniqueTags.map((tag) => (
          <Button
            key={tag}
            onClick={() => onTagClick(tag)}
            variant={selectedTag === tag ? "contained" : "outlined"}
            sx={{
              borderRadius: "4px",
              px: 2,
              py: 1,
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "none",
              borderColor: "#ea3b15",
              backgroundColor: selectedTag === tag ? "#ea3b15" : "transparent",
              color: selectedTag === tag ? "#fff" : "#ea3b15",
              "&:hover": {
                backgroundColor: selectedTag === tag ? "#d73a12" : "#fef6f5",
                borderColor: "#ea3b15",
              },
            }}
          >
            {tag.toUpperCase()}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
