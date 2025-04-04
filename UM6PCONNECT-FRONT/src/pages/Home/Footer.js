import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";

const links = ["About", "Help Center", "Privacy & Terms"];
const currentYear = new Date().getFullYear();

const Um6pFooter = () => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        px: 2,
        py: 3,
        textAlign: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      {/* Top Links */}
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        {links.map((text, index) => (
          <Grid item key={index}>
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: "14px",
                color: "#000",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Logo + Copyright */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Box
          component="img"
          src="/image.png" // Update path if needed
          alt="UM6P"
          sx={{ height: 20 }}
        />
        <Typography fontSize={14} color="#000">
          UM6P © {currentYear}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Um6pFooter;
