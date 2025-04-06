import React from "react";
import { Box, Typography } from "@mui/material";

const Step5 = () => (
  <Box textAlign="center">
    <Typography fontSize={28} fontWeight={400} mb={1}>
      Invite a Friend
    </Typography>
    <Typography fontSize={20} color="text.secondary" mb={2}>
      Grow the network by inviting your colleagues.
    </Typography>
    <img src="/assets/images/invite.png" alt="Invite" width={200} />
  </Box>
);

export default Step5;
