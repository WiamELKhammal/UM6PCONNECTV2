import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Grass";
import ScienceIcon from "@mui/icons-material/Science";
import SolarPowerIcon from "@mui/icons-material/SolarPower";

const MeetEngageR2 = () => {
  return (
    <Box
      id="academic"
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
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* LEFT: TEXT + PROJECTS */}
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
            Africa’s water systems are under immense stress from climate variability and inefficient resource use.
            UM6P’s researchers are tackling this through predictive irrigation models, AI-integrated water management,
            and satellite-based groundwater monitoring. Our work supports over 35 million m³ of water managed annually
            across experimental farms in Benguerir and Laâyoune. The International Water Research Institute (IWRI) leads
            projects focused on basin-level governance, smart desalination, and biosaline agriculture.
          </Typography>

          {/* ACTIVE PROJECTS */}
          <Stack spacing={2}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <AgricultureIcon sx={{ fontSize: 36, color: "#ea3b15" }} />
              <Box>
                <Typography fontWeight={600}>
                  AI-powered irrigation efficiency algorithms
                </Typography>
                <Typography variant="body2">
                  Optimizing water use for semi-arid crop conditions.
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <ScienceIcon sx={{ fontSize: 36, color: "#ea3b15" }} />
              <Box>
                <Typography fontWeight={600}>
                  Soil salinity control through LIBS spectroscopy
                </Typography>
                <Typography variant="body2">
                  A Photons Analysis startup collaboration for smart soil monitoring.
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <SolarPowerIcon sx={{ fontSize: 36, color: "#ea3b15" }} />
              <Box>
                <Typography fontWeight={600}>
                  Solar desalination integration
                </Typography>
                <Typography variant="body2">
                  Deployed in experimental field stations for sustainable water supply.
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Box>

        {/* RIGHT: IMAGE */}
        <Box
          component="img"
          src="/assets/images/herosection/R3.jpg"
          alt="Water Resilience Research"
          sx={{
            width: { xs: "100%", md: "600px", lg: "700px" },
            height: "auto",
            flexShrink: 0,
            alignSelf: "center",
          }}
        />
      </Box>
    </Box>
  );
};

export default MeetEngageR2;
