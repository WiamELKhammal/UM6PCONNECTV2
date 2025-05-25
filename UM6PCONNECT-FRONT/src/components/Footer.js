import React from "react";
import { Box, Typography, Grid, Link, Stack } from "@mui/material";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        color: "#000",
        borderLeft: "1px solid #CCC",

        px: { xs: 3, md: 10 },
        py: 6,
        fontFamily: "'Work Sans', sans-serif",
        borderTop:"1px solid #CCC"
      }}
    >
      <Grid container spacing={4}>
        {/* Logo Column */}
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontSize: "24px", fontWeight: 400, mb: 2 }}>
            UM6P CONNECT
          </Typography>
        </Grid>

        {/* Study & Live Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            WORK, LIVE & STUDY AT UM6P
          </Typography>
          <Stack spacing={1}>
            <Link href="#" underline="none" color="#000">Academic Life & Attractiveness</Link>
            <Link href="#" underline="none" color="#000">Residences & Infrastructure</Link>
            <Link href="#" underline="none" color="#000">Dining & Lifestyle</Link>
            <Link href="#" underline="none" color="#000">Wellness & Sports</Link>
            <Link href="#" underline="none" color="#000">Staff & Family Services</Link>
          </Stack>
        </Grid>

        {/* Vision Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            OUR VISION 2030
          </Typography>
          <Stack spacing={1} whiteSpace= "nowrap">
            <Link href="#" underline="none" color="#000">The Why Behind Vision 2030</Link>
            <Link href="#" underline="none" color="#000">Research</Link>
            <Link href="#" underline="none" color="#000">Education</Link>

            <Link href="#" underline="none" color="#000">Entrepreneurship</Link>
            <Link href="#" underline="none" color="#000">Social Impact</Link>

          </Stack>
        </Grid>

        {/* Researchers Section with noWrap */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            noWrap
            sx={{
              fontWeight: 600,
              mb: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color:"#000",
            }}
          >
            MEET AND ENGAGE WITH OUR RESEARCHERS
          </Typography>
          <Stack spacing={1}>
            <Link href="#" underline="none" color="#000"> Our Researchers
            </Link>

          </Stack>
        </Grid>
      </Grid>

      {/* Bottom bar */}
      <Box
        sx={{
          borderTop: "1px solid #CCC",
          mt: 5,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "14px", color: "#000" }}>
          © 2025 UM6P CONNECT. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={3} alignItems="center">
          <Link href="#" underline="none" color="#000">Terms</Link>
          <Link href="#" underline="none" color="#000">Privacy</Link>
          <Link href="#" underline="none" color="#000">Copyright</Link>
          <Link href="#" underline="none" color="#000">Imprint</Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
