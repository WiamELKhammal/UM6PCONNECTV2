import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Step1 = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        🎓 Complete Your Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Make sure your profile includes your full name, department, headline, bio, and profile photo.
      </Typography>

      <Box
        sx={{
          backgroundColor: "#f8f8f8",
          padding: 2,
          borderRadius: 2,
          border: "1px solid #eee",
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CheckCircleIcon sx={{ color: "#ea3b15", fontSize: 20 }} />
          <Typography fontSize={14}>Full Name</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CheckCircleIcon sx={{ color: "#ea3b15", fontSize: 20 }} />
          <Typography fontSize={14}>Department</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CheckCircleIcon sx={{ color: "#ea3b15", fontSize: 20 }} />
          <Typography fontSize={14}>Headline & Bio</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <CheckCircleIcon sx={{ color: "#ea3b15", fontSize: 20 }} />
          <Typography fontSize={14}>Profile Picture</Typography>
        </Box>
      </Box>

      <Chip
        label="+30 Points"
        sx={{
          mt: 2,
          backgroundColor: "#ea3b15",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 500,
        }}
      />
    </Box>
  );
};

export default Step1;
