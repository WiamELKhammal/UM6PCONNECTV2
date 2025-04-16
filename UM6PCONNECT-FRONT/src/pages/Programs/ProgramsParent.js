import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Fab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchBar from "../../components/SearchBar";
import FilterPage from "../../components/FilterPage";
import PostBacPrograms from "./PostBacPrograms";
import EngineeringMasterPrograms from "./EngineeringMasterPrograms";
import CombinedPrograms from "./CombinedPrograms";
import { Bot } from "lucide-react";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const categories = [
    { label: "All", value: "all" },
    { label: "Post-Bac Programs", value: "postbac" },
    { label: "Master Programs and Engineering Programs", value: "master" },
    { label: "Scholarship Programs", value: "scholarship" },
  ];

  return (
    <>
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: 3,
          pt: 10,
        }}
      >
        {/* HEADER */}
        <Typography  fontWeight={700} color="#000" mb={1} textAlign="center" fontSize= "33px">
          Explore Our Programs
        </Typography>
        <Typography
        fontSize= "25px"
          color="#555"
          mb={3}
          sx={{
            textAlign: "justify",
            mx: "auto",
            maxWidth: "90%",
          }}
        >
          Browse a diverse selection of academic programs tailored to empower
          your educational journey, enhance your professional skills, and open
          doors to a successful and fulfilling career in your chosen field.
        </Typography>

        <Box mb={3} display="flex" justifyContent="center">
          <SearchBar onSearch={handleSearch} />
        </Box>

        {/* CATEGORIES */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            mb: 4,
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              sx={{
                backgroundColor: selectedCategory === category.value ? "#e04c2c" : "#fff",
                color: selectedCategory === category.value ? "#fff" : "#000",
                fontWeight: 600,
                border: "1px solid #ddd",
                borderRadius: "12px",
                px: 2.5,
                py: 1.3,
                textTransform: "none",
                boxShadow:
                  selectedCategory === category.value
                    ? "0 2px 6px rgba(234, 59, 21, 0.2)"
                    : "none",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === category.value ? "#d73a12" : "#f9f9f9",
                },
              }}
            >
              {category.label}
            </Button>
          ))}
        </Box>

        {/* PROGRAMS + FILTERS */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          {/* LEFT: Programs */}
          <Box sx={{ flex: 1 }}>
            {selectedCategory === "all" && (
              <CombinedPrograms filters={filters} searchQuery={searchQuery} />
            )}
            {selectedCategory === "postbac" && (
              <PostBacPrograms filters={filters} searchQuery={searchQuery} />
            )}
            {selectedCategory === "master" && (
              <EngineeringMasterPrograms
                filters={filters}
                searchQuery={searchQuery}
              />
            )}
          </Box>

          {/* RIGHT: Filters aligned with content, not title */}
          <Box sx={{ width: isMobile ? "100%" : "280px", flexShrink: 0 }}>
            <FilterPage onFilterChange={handleApplyFilters} />
          </Box>
        </Box>
      </Box>

      {/* CHATBOT TOOLTIP */}
      <Box
        sx={{
          position: "fixed",
          bottom: "90px",
          right: "24px",
          backgroundColor: "#fff",
          color: "#000",
          fontSize: "14px",
          padding: "10px 16px",
          borderRadius: "12px",
          border: "1px solid #FFF",
          textAlign: "center",
          zIndex: 1301,
          maxWidth: 220,
          fontWeight: 500,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
          "::after": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            right: "24px",
            borderWidth: "10px 10px 0 10px",
            borderStyle: "solid",
            borderColor: "#fff transparent transparent transparent",
          },
        }}
      >
        Need help? Chat with us!
      </Box>

      {/* CHATBOT ICON */}
      <Fab
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#e04c2c",
          color: "#fff",
          "&:hover": { backgroundColor: "#d73a12" },
          zIndex: 1300,
        }}
      >
        <Bot />
      </Fab>
    </>
  );
};

export default ProgramsParent;
