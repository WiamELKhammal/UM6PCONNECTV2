import React from "react";
import { Box, Typography } from "@mui/material";

const Step4 = () => (
  <Box textAlign="center">
    <Typography fontSize={28} fontWeight={400} mb={1}>
      Follow People
    </Typography>
    <Typography fontSize={20} color="text.secondary" mb={2}>
      Stay updated by following researchers and peers.
    </Typography>
    <img src="/assets/images/following.png" alt="Following" width={200} />
  </Box>
);

export default Step4;
