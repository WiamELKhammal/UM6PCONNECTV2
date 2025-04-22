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
        src="https://www.youtube.com/watch?v=8VjdKsC90Gg&embeds_referring_euri=https%3A%2F%2Fhr-departement.vercel.app%2F&source_ve_path=Mjg2NjY"
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
