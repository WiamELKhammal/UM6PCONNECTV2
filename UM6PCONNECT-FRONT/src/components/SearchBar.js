import React, { useState } from "react";
import { Paper, InputBase, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase(); // Normalize to lower case
    onSearch(query); // Pass the query to the parent component
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
      {/* Search Bar with Increased Width */}
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            borderRadius: 20,
            width: "830px", // Set a fixed width as you requested
            boxShadow: "none",
            backgroundColor: "#fafafa",
            borderColor: "1px solid #ccc",
          }}
        >
          <IconButton sx={{ color: "#818485" }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search here ..."
            onChange={handleSearch} // Handle the search input
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default SearchBar;
