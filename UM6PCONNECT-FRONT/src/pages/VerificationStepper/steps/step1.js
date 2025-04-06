import React from "react";
import { Box, Typography } from "@mui/material";

const Step1 = () => (
  <Box textAlign="center">
    <Typography fontSize={28} fontWeight={400} mb={1}>
      Complete Your Profile
    </Typography>
    <Typography fontSize={20} color="text.secondary" mb={2}>
      Add your personal info to help others know you better.
    </Typography>
    <img src="/assets/images/profile.png" alt="Profile" width={200} />
  </Box>
);

export default Step1;
