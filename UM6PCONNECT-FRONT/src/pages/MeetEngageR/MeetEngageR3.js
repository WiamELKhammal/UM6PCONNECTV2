import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import ScienceIcon from "@mui/icons-material/Science";

const features = [
  {
    icon: <SolarPowerIcon sx={{ fontSize: 48, color: "#ea3b15" }} />,
    title: "Solar-powered ammonia generation units",
    description: "NitroFix collaboration enabling low-emission ammonia production.",
  },
  {
    icon: <BatteryChargingFullIcon sx={{ fontSize: 48, color: "#ea3b15" }} />,
    title: "LFP cathode design from Moroccan phosphate",
    description: "Local phosphate used to produce lithium iron phosphate batteries.",
  },
  {
    icon: <ScienceIcon sx={{ fontSize: 48, color: "#ea3b15" }} />,
    title: "Valorization of chemical byproducts",
    description: "Innovative reuse of byproducts in fertilizer plants to minimize waste.",
  },
];

const MeetEngageR3 = () => {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 10 },
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
        {/* LEFT: TEXT + CARDS */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: { xs: "18px", sm: "20px", md: "25px" },
              lineHeight: 1.8,
              textAlign: "justify",
              mb: 4,
            }}
          >
            With Africa’s fertilizer and energy needs growing, UM6P is driving research into
            low-emission ammonia production and phosphate battery chemistry. The Green Energy Park and
            GTI are piloting Morocco’s first green ammonia synthesis line, projected to produce 1 million
            tons annually by 2032, with 560 million m³ of water secured from OCP infrastructure to support
            this process. In parallel, CORE Labs are testing lithium iron phosphate (LFP) battery materials
            derived from local phosphate reserves, with 30 kt of phosphate battery inputs already engineered.
          </Typography>

          <Stack spacing={3}>
            {features.map((item, idx) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #CCC",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600} sx={{ fontSize: { xs: "18px", sm: "20px", md: "20px" }, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "18px", sm: "20px", md: "20px" }, color: "#555" }}>
                    {item.description}
                  </Typography>
                </Box>
                <Box>{item.icon}</Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default MeetEngageR3;
