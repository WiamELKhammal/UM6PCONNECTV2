import React from "react";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import { BoxIcon, RouteIcon, TrophyIcon, SignpostBigIcon } from "lucide-react";
const iconProps = {
  stroke: "#fff",
  strokeWidth: 1.5,
};

const features = [
  {
    icon: <RouteIcon {...iconProps} />,
    title: "Lorem Ipsum is simply dummy text",
    description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
},
  {
    icon: <TrophyIcon {...iconProps} />,
    title: "Lorem Ipsum is simply dummy text",
    description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
},
  {
    icon: <SignpostBigIcon {...iconProps} />,
    title: "Lorem Ipsum is simply dummy text",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export default function UseCases() {
  return (
    <Box px={{ xs: 2, md: 10 }} py={4}>
      <Box display="flex" alignItems="center" mb={2}>
        <BoxIcon
          style={{ color: "#ea3b15", marginRight: "8px" }}
          strokeWidth={2}
        />
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="#000"
          sx={{
            letterSpacing: 1,
            fontSize: "14px",
            textTransform: "uppercase",
          }}
        >
          UM6P CONNECT
        </Typography>
      </Box>

      <Box
        sx={{
          height: "1px",
          width: 180,
          backgroundColor: "#ea3b15",
          mt: -1,
          mb: 2,
        }}
      />

      <Box display="flex" justifyContent="space-between" flexWrap="wrap" mb={4}>
        <Box maxWidth={{ xs: "100%", md: "50%" }}>
          <Typography variant="h4" fontWeight="bold" lineHeight={1.3} color="#000">
            Explore the Minds Powering UM6P Innovation.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Avatar
                sx={{
                  bgcolor: "#ea3b15",
                  color: "#fff",
                  mb: 2,
                  width: 40,
                  height: 40,
                }}
              >
                {feature.icon}
              </Avatar>
              <Typography variant="h6" fontWeight={500} color="#000" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
