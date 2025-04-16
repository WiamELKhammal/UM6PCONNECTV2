import React from "react";
import { Box, Typography, Grid, Link, Stack } from "@mui/material";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#181717",
        color: "#f6f6f6",
        px: { xs: 3, md: 10 },
        py: 6,
        fontFamily: "'Work Sans', sans-serif",
        borderTop:"1px solid #fff"
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
            STUDY AND LIVE AT UM6P
          </Typography>
          <Stack spacing={1}>
            <Link href="#" underline="none" color="#ccc">Academic Life & Attractiveness</Link>
            <Link href="#" underline="none" color="#ccc">Residences & Infrastructure</Link>
            <Link href="#" underline="none" color="#ccc">Dining & Lifestyle</Link>
            <Link href="#" underline="none" color="#ccc">Wellness & Sports</Link>
            <Link href="#" underline="none" color="#ccc">Staff & Family Services</Link>
          </Stack>
        </Grid>

        {/* Vision Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            OUR VISION 2030
          </Typography>
          <Stack spacing={1} whiteSpace= "nowrap">
            <Link href="#" underline="none" color="#ccc">The Why Behind Vision 2030</Link>
            <Link href="#" underline="none" color="#ccc">Research</Link>
            <Link href="#" underline="none" color="#ccc">Education</Link>

            <Link href="#" underline="none" color="#ccc">Entrepreneurship</Link>
            <Link href="#" underline="none" color="#ccc">Social Impact</Link>

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
            }}
          >
            MEET AND ENGAGE WITH OUR RESEARCHERS
          </Typography>
          <Stack spacing={1}>
            <Link href="#" underline="none" color="#ccc"> Our Researchers
            </Link>

          </Stack>
        </Grid>
      </Grid>

      {/* Bottom bar */}
      <Box
        sx={{
          borderTop: "1px solid #FFF",
          mt: 5,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "14px", color: "#ccc" }}>
          © 2025 UM6P CONNECT. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={3} alignItems="center">
          <Link href="#" underline="none" color="#ccc">Terms</Link>
          <Link href="#" underline="none" color="#ccc">Privacy</Link>
          <Link href="#" underline="none" color="#ccc">Copyright</Link>
          <Link href="#" underline="none" color="#ccc">Imprint</Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
