import React, { useState } from "react";
import { Paper, InputBase, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Tags from "../pages/Home/Tags";

const SearchBar2 = ({ onSearch, tags, onTagClick, selectedTag }) => { // ✅ receive selectedTag
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleApplyFilter = (filters) => {
    console.log("Applied Filters: ", filters);
    setIsFilterOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          borderRadius: 12,
          width: "100%",
          boxShadow: "none",
          backgroundColor: "#FFF",
          border: "1px solid #CCC",
        }}
      >
        <IconButton sx={{ color: "#999" }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: "18px" }}
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </Paper>

      {/* Tags - now below search bar */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Tags
          tags={tags}
          onTagClick={onTagClick}
          selectedTag={selectedTag} // ✅ pass selectedTag to Tags
        />
      </Box>
    </Box>
  );
};

export default SearchBar2;
