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
        backgroundColor: "#000",
        borderBottom: "1px solid #fff",
        borderLeft: "1px solid #CCC",
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
            width: { xs: 64, sm: 80, md: 100 },
            height: { xs: 64, sm: 80, md: 100 },
            backgroundColor: "#e04c2c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            animation: "pulse 2s infinite",
            borderRadius: "50%",
          }}
          onClick={() => setOpen(true)}
        >
          <YouTubeIcon sx={{ fontSize: { xs: 36, sm: 42, md: 48 }, color: "#fff" }} />
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
            px: 2,
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
              color: "#fff",
              zIndex: 99999,
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: 28, md: 36 } }} />
          </IconButton>

          <Box
            component="iframe"
            src="https://www.youtube.com/embed/FbBuLI_5CBE?autoplay=1&controls=1&rel=0&modestbranding=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              width: { xs: "90vw", sm: "85vw", md: "80vw" },
              height: { xs: "50vh", sm: "60vh", md: "70vh" },
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
