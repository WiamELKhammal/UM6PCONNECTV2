import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const achievements = [
  "15 new biomaterials tested in North African settings",
  "3 bioassays patented for immune-inflammatory markers",
  "Precision lactoferrin protein developed (De Novo Foodlabs)",
];

const MeetEngageBiotech = () => {
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
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        {/* LEFT: TEXT + ACHIEVEMENTS */}
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
            UM6P’s ISSB-P and SHCC are pioneering biotech platforms for African health. Focused on
            inflammation, chronic illness, and maternal care, our teams are piloting low-cost diagnostics,
            immune-response mapping, and local clinical trials. Collaborations with MASCIR Valor and
            InfiussHealth support scaling, while student researchers contribute from bench to field.
          </Typography>

          <Stack spacing={2}>
            {achievements.map((item, idx) => (
              <Box key={idx} sx={{ display: "flex", alignItems: "flex-start" }}>
                <ChevronRightIcon sx={{ color: "#ea3b15", mt: "4px", mr: 2, fontSize: 28 }} />
                <Typography sx={{ fontSize: { xs: "18px", sm: "20px", md: "25px" }, color: "#333" }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* RIGHT: IMAGE */}
        <Box
          component="img"
          src="/assets/images/herosection/_DPH1321AK-web.jpg"
          alt="Biotech Research"
          sx={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
            flexShrink: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default MeetEngageBiotech;
