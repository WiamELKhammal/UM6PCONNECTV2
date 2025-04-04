import React, { useEffect, useContext } from "react";
import { Grid, Typography, Box, InputBase, Paper } from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const CustomInput = ({ label, name, value, onChange, multiline = false, type = "text", placeholder }) => (
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
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        multiline={multiline}
        minRows={multiline ? 4 : 1}
        sx={{ fontSize: 15 }}
      />
    </Paper>
  </Box>
);

const Step2Professional = ({ data, setData }) => {
  const { user } = useContext(UserContext);

  const handleChange = (field, value) => {
    const updatedData = { ...data, [field]: value };
    setData(updatedData);
    localStorage.setItem("completeProfileData", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const stored = localStorage.getItem("completeProfileData");
    let localData = stored ? JSON.parse(stored) : {};
  
    if (user) {
      const prefill = {
        headline: localData.headline || user.headline || "",
        linkedIn: localData.linkedIn || user.linkedIn || user.linkedin || "",
        researchGate: localData.researchGate || user.researchGate || "",
      };
  
      const mergedData = { ...localData, ...prefill };
      setData(mergedData);
      localStorage.setItem("completeProfileData", JSON.stringify(mergedData));
    } else {
      setData(localData);
    }
  }, [setData, user]);
  

  return (
    <Box mt={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            label="Enter your headline"
            name="headline"
            value={data.headline}
            onChange={handleChange}
            placeholder="e.g. PhD Student in Computer Science"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomInput
            label="Your LinkedIn profile"
            name="linkedIn"
            type="url"
            value={data.linkedIn}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/your-profile"
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            label="Your ResearchGate profile"
            name="researchGate"
            type="url"
            value={data.researchGate}
            onChange={handleChange}
            placeholder="https://www.researchgate.net/profile/your-name"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2Professional;
