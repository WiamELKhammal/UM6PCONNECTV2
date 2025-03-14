import React, { useState } from "react";
import { Paper, InputBase, Box, IconButton, Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Tags from "../pages/Home/Tags"; // Assuming the Tags component is in the same folder
import FilterPage from "./FilterPage"; // Import the FilterPage component

const SearchBar = ({ onSearch, tags, onTagClick }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle the filter visibility

  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => !prev); // Toggle the filter options
  };

  const handleApplyFilter = (filters) => {
    console.log("Applied Filters: ", filters); // Process the filters as needed
    // You can also pass these filters to the parent or backend
    setIsFilterOpen(false); // Close the filter page after applying
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
      {/* Search Bar with Tags in the same line */}
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            borderRadius: 20,
            width: "30%",
            boxShadow: "none",
            backgroundColor: "#fafafa",
            borderColor: "#ccc",
          }}
        >
          <IconButton sx={{ color: "#818485" }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <IconButton sx={{ color: "#818485" }} onClick={handleFilterToggle}>
            <FilterListIcon />
          </IconButton>
        </Paper>

        {/* Tags displayed in the same line as the search bar */}
        <Tags tags={tags} onTagClick={onTagClick} />
      </Box>

      {/* FilterPage - Displayed below the search bar when the filter icon is clicked */}
      <Collapse in={isFilterOpen}>
        <Box sx={{ mt: 2 }}>
          <FilterPage onApplyFilter={handleApplyFilter} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default SearchBar;
