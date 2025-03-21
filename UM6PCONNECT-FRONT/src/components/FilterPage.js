import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

const FilterPage = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    school: "",
    degreeType: "",
    programDuration: "",

  });

  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters); // Update parent immediately
  };

  return (
    <Box
      sx={{
        width: "280px",
        background: "linear-gradient(180deg, #ea3b15 0%, #c93210 100%)",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "147px",
        color: "#fff",
      }}
    >
      {/* Filters Header */}
      <Typography variant="h6" sx={{ fontWeight: "semi-bold", mb: 1, color: "white" }}>
        Filters :
      </Typography>

      {/* Category Selection */}
      

      {/* School Filter */}
      <FormControl fullWidth sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "semi-bold", mb: 1, color: "white" }}>
        School</Typography>
        <Select
          name="school"
          value={filters.school}
          onChange={handleFilterChange}
          displayEmpty
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            color: "#333",
            fontWeight: "semi-bold",
            "& .MuiSelect-icon": { color: "#ea3b15" },
          }}
        >
          <MenuItem value="">All Schools</MenuItem>
          <MenuItem value="FMS">Faculty of Medical Sciences (FMS)</MenuItem>
          <MenuItem value="ISSBP">Institut Supérieur des Sciences Biologiques et Paramédicales (ISSBP)</MenuItem>
          <MenuItem value="EMINES">EMINES</MenuItem>
          <MenuItem value="CC">Center for Computing (CC)</MenuItem>
          <MenuItem value="ESAFE">ESAFE</MenuItem>
          <MenuItem value="IST&I">IST&I</MenuItem>
          <MenuItem value="SAP+D">SAP+D</MenuItem>
          <MenuItem value="ABS">ABS</MenuItem>
          <MenuItem value="SHBM">School of Hospitality Business and Management (SHBM)</MenuItem>
          <MenuItem value="FGSES">Faculty of Governance, Economics, and Social Sciences (FGSES)</MenuItem>
        </Select>
      </FormControl>

<FormControl fullWidth sx={{ mb: 3 }}>
  {/* Bigger Title */}
  <Typography variant="h6" sx={{ fontWeight: "semi-bold", mb: 1, color: "white" }}>
    Category
  </Typography>

  <RadioGroup
    name="category"
    value={filters.category}
    onChange={handleFilterChange}
  >
    {[
      { label: "All Categories", value: "" },  // Resets the filter
      { label: "Health", value: "Health" },
      { label: "Science and Technology", value: "Science and Technology" },
      { label: "Business and Management", value: "Business and Management" },
      { label: "Social Sciences, Economics, and Humanities", value: "Social Sciences, Economics, and Humanities" },
    ].map((option) => (
      <FormControlLabel
        key={option.value}
        control={
          <Radio
            sx={{
              color: "#fff", // Default red color
              "&.Mui-checked": { color: "white" }, // White when selected
            }}
          />
        }
        value={option.value}
        label={
          <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "white" }}>
            {option.label}
          </Typography>
        }
      />
    ))}
  </RadioGroup>
</FormControl>

      {/* Degree Type Filter */}

      <FormControl fullWidth sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "semi-bold", mb: 1, color: "white" }}>
      Degree Type</Typography>

        <RadioGroup
          name="degreeType"
          value={filters.degreeType}
          onChange={handleFilterChange}
        >
          {[
            { label: "All Degree Types", value: "" },  // Resets the filter
            { label: "Bachelor", value: "Bachelor" },
            { label: "Doctorate", value: "Doctorate" },
            { label: "Preparatory Cycle", value: "Preparatory Cycle" },
            { label: "Integrated Cycle", value: "Integrated Cycle" },
            { label: "Architect Degree", value: "Architect Degree" },
          ].map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Radio
                  sx={{
                    color: "#fff", // Default color
                    "&.Mui-checked": { color: "#fff" }, // White when selected
                  }}
                />
              }
              value={option.value}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {/* Apply Filters Button */}
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          fullWidth
          sx={{
            backgroundColor: "#FFFF",
            color: "#ea3b15",
            fontWeight: "semi-bold",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#c93210" },
          }}
          onClick={() => onFilterChange(filters)}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPage;
