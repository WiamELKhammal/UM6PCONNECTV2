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
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2,alignItems: "center",justifyContent:"center",paddingLeft:"170px" }}>
      {/* Search Bar with Increased Width */}
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            borderRadius: "12px",
            
            width: "90%", // Set a fixed width as you requested
            boxShadow: "none",
            backgroundColor: "#FFF",
            border: "1px solid #ccc",
          }}
        >
          <IconButton sx={{ color: "#CCC" }}>
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
