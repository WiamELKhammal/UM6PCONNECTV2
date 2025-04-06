import React from "react";
import { Box, Typography } from "@mui/material";

const Step3 = () => (
  <Box textAlign="center">
    <Typography fontSize={28} fontWeight={400} mb={1}>
      Get 10 Followers
    </Typography>
    <Typography fontSize={20} color="text.secondary" mb={2}>
      Gain credibility by growing your follower base.
    </Typography>
    <img src="/assets/images/followers.png" alt="Followers" width={200} />
  </Box>
);

export default Step3;
