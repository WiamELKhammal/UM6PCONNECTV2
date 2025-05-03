import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import ScienceIcon from "@mui/icons-material/Science";
import "@fontsource/work-sans/300.css";
import "@fontsource/work-sans/600.css";


const MeetEngageR3 = () => {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 10 },
        borderLeft: "1px solid #CCC",
        backgroundColor: "#FFF",
        color: "#000",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 6, md: 8 },
        }}
      >
        {/* Text + Feature Cards */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: { xs: '20px', sm: '22px', md: '25px' },
              lineHeight: { xs: "28px", sm: "30px", md: "34px" },
              textAlign: "justify",
              mb: 4,
            }}
          >

UM6P’s agri-research focuses on helping African farming systems thrive despite soil degradation, drought, and climate volatility. At our ASARI site in Laâyoune and farms in Tata and Benguerir, we test CRISPR-enhanced seeds, biosaline crop strains, and AI-based soil analytics. The work is driven by ESAFE and supported by UM6P Ventures-backed startups like De Novo Foodlabs (fermentation proteins) and ClimateCrop (carbon-hungry cereals).

          </Typography>

          
        </Box>

        {/* Image */}
        <Box
          component="img"
          src="/assets/images/herosection/R2.jpg"
          alt="Green Energy"
          sx={{
            width: { xs: "100%", md: "700px", lg: "750px" },
            height: "auto",
            flexShrink: 0,
            alignSelf: "center",
          }}
        />
      </Box>
    </Box>
  );
};

export default MeetEngageR3;
