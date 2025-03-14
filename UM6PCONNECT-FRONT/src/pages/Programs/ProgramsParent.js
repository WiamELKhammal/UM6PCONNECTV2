import React, { useState } from "react";
import { Button, ButtonGroup, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchBar from "../../components/SearchBar";
import PostBacPrograms from "./PostBacPrograms";
import EngineeringMasterPrograms from "./EngineeringMasterPrograms";

const ProgramsParent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", position: "relative",paddingTop: "90px" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "36px", color: "#000" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h1>

      {/* Search Bar */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SearchBar onSearch={handleSearch} onFilterClick={handleFilterClick} />
      </div>

      {/* Category Buttons */}
      <ButtonGroup sx={{ marginBottom: "20px", marginTop: "20px" }}>
        {[
          { label: "All", value: "all" },
          { label: "Post-Bac Programs", value: "postbac" },
          { label: "Engineering Programs", value: "ingenieur" },
          { label: "Master Programs", value: "master" },
          { label: "Schools Programs", value: "schools" }, // Nouveau bouton
          { label: "Scholarship Programs", value: "scholarship" },
        ].map((category) => (
          <Button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            variant={selectedCategory === category.value ? "contained" : "outlined"}
            sx={{
              backgroundColor: selectedCategory === category.value ? "#d84b2b" : "transparent",
              color: selectedCategory === category.value ? "#fff" : "#d84b2b",
              borderColor: "#d84b2b",
              "&:hover": { backgroundColor: "#b63e24", color: "#fff" },
            }}
          >
            {category.label}
          </Button>
        ))}
      </ButtonGroup>

      {/* Conditional Rendering of Programs */}
      {(selectedCategory === "all" || selectedCategory === "postbac") && <PostBacPrograms />}
      {(selectedCategory === "all" || selectedCategory === "ingenieur" || selectedCategory === "master") && <EngineeringMasterPrograms />}

      {/* Chatbot Floating Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#d84b2b",
          boxShadow: "none",
          "&:hover": { backgroundColor: "#b63e24" },
        }}
      >
        <ChatIcon />
      </Fab>
    </div>
  );
};

export default ProgramsParent;
