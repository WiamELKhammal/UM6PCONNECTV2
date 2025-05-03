import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloseIcon from "@mui/icons-material/Close";

const TheWhyVideo = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#FFF",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="/assets/images/herosection/Placeholders/ourvision.png"
        alt="Video Placeholder"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Animated YouTube Button */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 100,
            height: 100,
            backgroundColor: "#ea3b15",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            animation: "pulse 2s infinite",
          }}
          onClick={() => setOpen(true)}
        >
          <YouTubeIcon sx={{ fontSize: 48, color: "#fff" }} />
        </Box>
      </Box>

      {/* Modal Fullscreen Video */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "#fff",
              zIndex: 99999,
            }}
          >
            <CloseIcon sx={{ fontSize: 36 }} />
          </IconButton>

          <Box
            component="iframe"
            src="https://www.youtube.com/embed/FbBuLI_5CBE?autoplay=1&controls=1&rel=0&modestbranding=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              width: { xs: "90vw", md: "80vw" },
              height: { xs: "50vh", md: "70vh" },
              border: "none",
              borderRadius: "8px",
              zIndex: 9999,
            }}
          />
        </Box>
      )}

      {/* Glow animation keyframes */}
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(234, 59, 21, 0.4);
            }
            70% {
              box-shadow: 0 0 0 25px rgba(234, 59, 21, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(234, 59, 21, 0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default TheWhyVideo;
