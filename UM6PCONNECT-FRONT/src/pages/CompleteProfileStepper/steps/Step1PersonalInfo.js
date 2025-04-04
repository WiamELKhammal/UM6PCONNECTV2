import React, { useContext, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  InputBase,
  Paper,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const departments = [
  "ABS-Africa Business School",
  "AGBS-AGROBIOSCIENCES",
  "AGC-African Genome Center",
  "AITTC-Agricultural Innovation and Technology Transfer Center",
  "ASARI-African Sustainable Agriculture Research Institute",
  "GCZSC-Global Critical Zone Science",
  "IST&I-Institut of Sciences, Technology & Innovation",
  "SCI-School of Collective Intelligence",
  "Strategie-Strategie (Agriculture, Climat, Eau)",
  "HTMR-High Throughput Multidisciplinary Research Laboratory",
  "LIMSET-Laboratory of Inorganic Materials for Sustainable Energy Technologies",
  "MSN-Materials Science Energy and Nano-engineering",
  "SE-Sciences de l’Éducation",
  "IWRI-International Water Research Institute",
  "ACER CoE-Applied Chemistry & Engineering Research Centre of Excellence",
  "ACPPS-Arab Classical Philosophy and Philosophy of Sciences",
  "CRSA-Center for Remote Sensing Application",
  "CSAES-College for Sustainable Agriculture and Environmental Science",
  "EIEA-Chair Industrial Economics of African Emergence",
  "FGSES-Humanities",
  "GSMI-Geology & Sustainable Mining Institute",
  "GTI-Green Tech Institute",
  "CBS-Chemical and Biochemical Sciences",
  "CESFRA-Center of Excellence in Soil and Fertilizer Research in Africa",
  "CMTJ-Centre Marocain de Théorie des Jeux",
  "COLCOM-College of Computing",
  "IAP-Institute of Applied Physics",
  "MAScIR-Moroccan Foundation for Advanced Science innovation and Research",
  "SusMat-Chair of Sustainable Materials",
  "UM6P-FMS-UM6P Faculty of Medical Sciences",
  "Vanguard-The UM6P Vanguard Center",
  "Other"
];

const CustomInput = ({ label, value, onChange, name }) => (
  <Box mb={2}>
    <Typography fontSize={14} fontWeight={500} mb={0.5}>
      {label} *
    </Typography>
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px 14px",
        backgroundColor: "#fff",
        boxShadow: "none",
      }}
    >
      <InputBase
        fullWidth
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={label.replace("*", "").trim()}
        sx={{ fontSize: 15 }}
      />
    </Paper>
  </Box>
);

const Step1PersonalInfo = ({ data, setData }) => {
  const { user } = useContext(UserContext);

  const handleChange = (field, value) => {
    const updated = { ...data, [field]: value };

    // Ensure Departement is mapped correctly
    if (field === "department" && value !== "Other") {
      updated.Departement = value;
    }
    if (field === "customDepartment" && data.department === "Other") {
      updated.Departement = value;
    }

    setData(updated);
    localStorage.setItem("completeProfileData", JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = localStorage.getItem("completeProfileData");
    if (stored) {
      setData(JSON.parse(stored));
    } else if (user) {
      const prefill = {
        firstName: user.firstName || user.Prenom || "",
        lastName: user.lastName || user.Nom || "",
        department: user.Departement === "Other" ? "Other" : user.Departement || "",
        customDepartment: user.Departement === "Other" ? user.Departement : "",
        Departement: user.Departement || "",
      };
      setData((prev) => ({ ...prev, ...prefill }));
      localStorage.setItem("completeProfileData", JSON.stringify(prefill));
    }
  }, [setData, user]);

  return (
    <Box mt={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            label="Enter your first name"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            label="Enter your last name"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={14} fontWeight={500} mb={0.5}>
            Select your department *
          </Typography>
          <FormControl fullWidth>
            <Select
              name="department"
              value={data.department || ""}
              onChange={(e) => handleChange("department", e.target.value)}
              displayEmpty
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#fff",
                px: 2,
                py: 1,
                fontSize: 15,
              }}
            >
              <MenuItem disabled value="">
                Choose your department
              </MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {data.department === "Other" && (
          <Grid item xs={12}>
            <CustomInput
              label="Enter your department"
              name="customDepartment"
              value={data.customDepartment || ""}
              onChange={handleChange}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Step1PersonalInfo;
