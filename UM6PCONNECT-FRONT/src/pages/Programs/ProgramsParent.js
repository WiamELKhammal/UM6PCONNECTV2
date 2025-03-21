import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Fab } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import PostBacPrograms from "./PostBacPrograms";
import EngineeringMasterPrograms from "./EngineeringMasterPrograms";
import FilterPage from "../../components/FilterPage";
import { Bot } from "lucide-react";
import CombinedPrograms from "./CombinedPrograms";

const ProgramsParent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({
    category: "",
    school: "",
    degreeType: "",
    programDuration: "",
    hasWebsite: false,
    hasApplyLink: false,
  });

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase()); // Store the search query
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters); // Update the filters state
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "40px",
        paddingTop: "90px",
        maxWidth: "1300px",
        margin: "0 auto",
      }}
    >
      {/* Left Content (Programs & Filters) */}
      <Box sx={{ flex: 1 }}>
        <h1 style={{ fontSize: "36px", color: "#000", textAlign: "left", marginLeft: "55px" }}>
          Explore Our Programs
        </h1>
        {/* Subtitle */}
        <h2 style={{ fontSize: "24px", color: "#555", textAlign: "left", marginTop: "10px", marginLeft: "55px" }}>
          Discover a wide range of programs designed to help you achieve your academic and career goals.
        </h2>

        {/* Search Bar */}
        <Box sx={{ marginLeft: "55px", marginTop: "10px" }}>
          <SearchBar onSearch={handleSearch} />
        </Box>

        {/* Category Buttons */}
        <ButtonGroup
          sx={{
            marginBottom: "20px",
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "All", value: "all" },
            { label: "Post-Bac Programs", value: "postbac" },
            { label: "Master Programs and Engineering Programs", value: "master" },
            { label: "Scholarship Programs", value: "scholarship" },
          ].map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant={selectedCategory === category.value ? "contained" : "outlined"}
              sx={{
                backgroundColor: selectedCategory === category.value ? "#ea3b15" : "transparent",
                color: selectedCategory === category.value ? "#fff" : "#ea3b15",
                borderColor: "#ea3b15",
                whiteSpace: "nowrap",
                "&:hover": { backgroundColor: "#ea3b15", color: "#fff" },
              }}
            >
              {category.label}
            </Button>
          ))}
        </ButtonGroup>

        {/* Render Programs with Filters and Search */}
        {(selectedCategory === "all") && <CombinedPrograms filters={filters} searchQuery={searchQuery} />}
        {(selectedCategory === "postbac") && <PostBacPrograms filters={filters} searchQuery={searchQuery} />}
        {(selectedCategory === "master") && <EngineeringMasterPrograms filters={filters} searchQuery={searchQuery} />}
      </Box>

      {/* Right Side - FilterPage */}
      <Box sx={{ width: "250px", marginLeft: "20px" }}>
        <FilterPage onFilterChange={handleApplyFilters} />
      </Box>

      {/* Chatbot Floating Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#ea3b15",
          boxShadow: "none",
          "&:hover": { backgroundColor: "#ea3b15" },
        }}
      >
        <Bot />
      </Fab>
    </Box>
  );
};

export default ProgramsParent;
