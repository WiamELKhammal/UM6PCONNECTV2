import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Link as MuiLink,
} from "@mui/material";

// Helper to extract the username from a given URL
const extractUsername = (url) => {
  if (!url) return null;
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[parts.length - 1]; // Get last segment of path
  } catch {
    return null;
  }
};

// InfoLine component to display icon + clickable username
const InfoLine = ({ value, icon }) => {
  const username = extractUsername(value);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      {value ? (
        <MuiLink
          href={value}
          target="_blank"
          rel="noopener"
          fontSize={15}
          color="#111827"
          underline="hover"
        >
          {username}
        </MuiLink>
      ) : (
        <Typography fontSize={15} color="#999">
          Not provided
        </Typography>
      )}
    </Box>
  );
};

// Main component
const Step4Review = ({ data }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        backgroundColor: "#fff",
      }}
    >
      {/* COVER SECTION */}
      <Box position="relative" minHeight={160}>
        <Box
          component="img"
          src={data.coverPicture}
          alt="Cover"
          sx={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {/* PROFILE + INFO SECTION */}
      <Box mt={-6} px={4} pb={4}>
        <Stack alignItems="flex-start" spacing={1}>
          {/* Avatar */}
          {data.profilePicture && (
            <Avatar
              src={data.profilePicture}
              alt="Profile"
              sx={{
                width: 100,
                height: 100,
                border: "3px solid white",
                backgroundColor: "#eee",
              }}
            />
          )}

          {/* Text Info */}
          <Typography variant="h6" fontWeight="bold">
            {data.firstName} {data.lastName}
          </Typography>
          <Typography fontSize={14} color="text.secondary">
            {data.headline || "No headline added"}
          </Typography>
          <Typography fontSize={14} color="#6b7280">
            {data.department || "No department"}
          </Typography>

          {/* Links */}
          <Box mt={2}>
            <Stack spacing={1}>
              <InfoLine
                value={data.linkedIn}
                icon={
                  <Box
                    component="img"
                    src="/assets/images/linkedin.svg"
                    alt="LinkedIn"
                    sx={{ width: 20, height: 20 }}
                  />
                }
              />
              <InfoLine
                value={data.researchGate}
                icon={
                  <Box
                    component="img"
                    src="/assets/images/researchgate.svg"
                    alt="ResearchGate"
                    sx={{ width: 20, height: 20 }}
                  />
                }
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Step4Review;
