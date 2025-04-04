import React, { useState } from "react";
import { Paper, InputBase, Box, IconButton, Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Tags from "../pages/Home/Tags";
import FilterPage from "./FilterPage";

const SearchBar2 = ({ onSearch, tags, onTagClick }) => {
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
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <IconButton sx={{ color: "#999" }} onClick={handleFilterToggle}>
          <FilterListIcon />
        </IconButton>
      </Paper>

      {/* Tags - now below search bar */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Tags tags={tags} onTagClick={onTagClick} />
      </Box>

      {/* Filter */}
      <Collapse in={isFilterOpen}>
        <Box sx={{ mt: 2 }}>
          <FilterPage onFilterChange={handleApplyFilter} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default SearchBar2;
