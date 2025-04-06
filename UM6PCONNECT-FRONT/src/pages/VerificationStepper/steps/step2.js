import React from "react";
import { Box, Typography } from "@mui/material";

const Step2 = () => (
  <Box textAlign="center">
    <Typography fontSize={28} fontWeight={400} mb={1}>
      Share Your Research
    </Typography>
    <Typography fontSize={20} color="text.secondary" mb={2}>
      Highlight your current research to build credibility.
    </Typography>
    <img src="/assets/images/research.png" alt="Research" width={200} />
  </Box>
);

export default Step2;
