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
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "280px" },
        background: "linear-gradient(180deg, #fff 0%, #fff 100%)",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #ccc",
        color: "#fff",
      }}
    >
      <Typography variant="h6" color="black" sx={{ fontWeight: 600, mb: 2 }}>
        Filters:
      </Typography>

      {/* School Filter */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
          School
        </Typography>
        <Select
          name="school"
          value={filters.school}
          onChange={handleFilterChange}
          displayEmpty
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            color: "#333",
            fontWeight: 600,
            "& .MuiSelect-icon": { color: "#000" },
          }}
        >
          <MenuItem value="">All Schools</MenuItem>
          <MenuItem value="FMS">Faculty of Medical Sciences (FMS)</MenuItem>
          <MenuItem value="ISSBP">ISSBP</MenuItem>
          <MenuItem value="EMINES">EMINES</MenuItem>
          <MenuItem value="CC">Center for Computing (CC)</MenuItem>
          <MenuItem value="ESAFE">ESAFE</MenuItem>
          <MenuItem value="IST&I">IST&I</MenuItem>
          <MenuItem value="SAP+D">SAP+D</MenuItem>
          <MenuItem value="ABS">ABS</MenuItem>
          <MenuItem value="SHBM">SHBM</MenuItem>
          <MenuItem value="FGSES">FGSES</MenuItem>
        </Select>
      </FormControl>

      {/* Category Filter */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
          Category
        </Typography>
        <RadioGroup name="category" value={filters.category} onChange={handleFilterChange}>
          {[
            { label: "All Categories", value: "" },
            { label: "Health", value: "Health" },
            { label: "Science and Technology", value: "Science and Technology" },
            { label: "Business and Management", value: "Business and Management" },
            { label: "Social Sciences", value: "Social Sciences" },
          ].map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={
                <Radio sx={{ color: "#000", "&.Mui-checked": { color: "#ea3b15" } }} />
              }
              label={
                <Typography sx={{ fontSize: "14px", color: "#000" }}>
                  {option.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Degree Type Filter */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
          Degree Type
        </Typography>
        <RadioGroup name="degreeType" value={filters.degreeType} onChange={handleFilterChange}>
          {[
            { label: "All Degree Types", value: "" },
            { label: "Bachelor", value: "Bachelor" },
            { label: "Doctorate", value: "Doctorate" },
            { label: "Preparatory Cycle", value: "Preparatory Cycle" },
            { label: "Integrated Cycle", value: "Integrated Cycle" },
            { label: "Architect Degree", value: "Architect Degree" },
          ].map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={
                <Radio sx={{ color: "#000", "&.Mui-checked": { color: "#ea3b15" } }} />
              }
              label={
                <Typography sx={{ fontSize: "14px", color: "#000" }}>
                  {option.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Apply Filters Button */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          fullWidth
          onClick={() => onFilterChange(filters)}
          sx={{
            backgroundColor: "#fff",
            color: "#ea3b15",
            border: "1px solid #ccc",

            fontWeight: 600,
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#ea3b15", color: "#fff" },
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPage;
