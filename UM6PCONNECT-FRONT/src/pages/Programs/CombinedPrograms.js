import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Pagination } from "@mui/material";

const CombinedPrograms = ({ filters, searchQuery }) => {
  const [postBac, setPostBac] = useState([]);
  const [engineeringMaster, setEngineeringMaster] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 items per page

  useEffect(() => {
    // Fetch Post-Bac Programs
    fetch("/data/poles.json")
      .then((response) => response.json())
      .then((data) => setPostBac(data.flatMap((pole) => pole.schools)))
      .catch((error) => console.error("Error loading Post-Bac programs:", error));

    // Fetch Engineering & Master Programs
    fetch("/data/programs_engineering_master.json")
      .then((response) => response.json())
      .then((data) => setEngineeringMaster(data.flatMap((domain) => domain.schools)))
      .catch((error) => console.error("Error loading Engineering & Master programs:", error));
  }, []);

  // Combine both programs
  const allPrograms = [...postBac, ...engineeringMaster];

  // **Apply Filters and Search**
  const filteredPrograms = allPrograms.filter((school) => {
    const matchesSearch =
      searchQuery
        ? school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true; // If no search query, match all programs

    return (
      matchesSearch &&
      (!filters.category || (school.category || "") === filters.category) &&
      (!filters.school || (school.name || "").toLowerCase().includes(filters.school.toLowerCase())) &&
      (!filters.degreeType || (school.degreeType || "") === filters.degreeType) &&
      (!filters.duration || (school.duration || "") === filters.duration)
    );
  });

  // Apply pagination AFTER filtering
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const currentPrograms = filteredPrograms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
<Box sx={{ width: "100%" }}>
{/* Display message if no programs found */}
      {filteredPrograms.length === 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ color: "#818485", fontSize: "18px" }}>
            No programs found matching your filters or search query.
          </Typography>
        </Box>
      )}

      {currentPrograms.map((school, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #ccc",
            boxShadow: "none",
            marginBottom: "20px",
            padding: "15px",
            width: "100%",
            gap: "20px",
          }}
        >
          {/* Left Side - BIGGER Logo Image */}
          <Box>
            <img
              src={school.logo}
              alt={school.name}
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Center - Text Details */}
          <CardContent sx={{ flex: 1, padding: "0", textAlign: "justify" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>
              {school.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", mt: 1, textAlign: "justify" }}>
              {school.description}
            </Typography>
          </CardContent>

          {/* Right Side - Apply Button */}
          <Box sx={{ flexShrink: 0 }}>
            <Button
              sx={{
                backgroundColor: "#e04c2c",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "8px 16px",
                minWidth: "140px",
                "&:hover": { backgroundColor: "#c93210" },
              }}
              href={school.apply_link}
              target="_blank"
            >
              Apply
            </Button>
          </Box>
        </Card>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#e04c2c",
                borderColor: "#e04c2c",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#e04c2c",
                color: "#fff",
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#f28c6f",
                color: "#fff",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CombinedPrograms;
