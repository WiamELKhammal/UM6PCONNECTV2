import React from "react";
import { Box } from "@mui/material";

const IntroVideo = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        component="iframe"
        src="https://www.youtube.com/embed/FbBuLI_5CBE?autoplay=0&controls=1&rel=0&modestbranding=1"
        title="UM6P Intro Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </Box>
  );
};

export default IntroVideo;
