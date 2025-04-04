import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockClockIcon from "@mui/icons-material/LockClock";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const achievements = [
  { title: "Share your first research", points: 10, unlocked: true },
  { title: "Follow 10 people", points: 20, unlocked: false },
  { title: "Reach 10 followers", points: 50, unlocked: false },
  { title: "Complete your profile", points: 30, unlocked: true },
  { title: "Add a project", points: 15, unlocked: true },
  { title: "Get your first follower", points: 5, unlocked: true },
  { title: "Invite a friend", points: 10, unlocked: false }
];

const UserAchievements = () => {
  const [expanded, setExpanded] = useState(false);

  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card
        sx={{
          width: 360,
          borderRadius: 3,
          boxShadow: "none",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <CardContent sx={{ pt: 2, pb: expanded ? 2 : 1 }}>
          <Box mb={expanded ? 2 : 0}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography sx={{ fontWeight: "bold", color: "#000", fontSize: 18 }}>
                Achievements
              </Typography>
              <Box onClick={() => setExpanded(!expanded)} sx={{ cursor: "pointer" }}>
                {expanded ? (
                  <KeyboardArrowUpIcon sx={{ color: "#000", fontSize: 26 }} />
                ) : (
                  <KeyboardArrowDownIcon sx={{ color: "#000", fontSize: 26 }} />
                )}
              </Box>
            </Box>
            <Typography sx={{ fontSize: 13 }} color="textSecondary">
              Earn points by completing actions and growing your network.
            </Typography>
          </Box>

          {expanded && (
            <>
    
              {achievements.map((a, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 4,
                    padding: "10px",
                    mb: 1,
                    border: "1px solid #ededed",
                    backgroundColor: "#f8f8f8",
                  }}
                >
                  {a.unlocked ? (
                    <CheckCircleIcon sx={{ color: "#ea3b15", fontSize: 24 }} />
                  ) : (
                    <LockClockIcon sx={{ color: "#bbb", fontSize: 24 }} />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      flexGrow: 1,
                      marginLeft: "10px",
                      color: a.unlocked ? "#000" : "#999",
                      fontWeight: a.unlocked ? 500 : 400,
                    }}
                  >
                    {a.title}
                  </Typography>
                  <Chip
                    label={`+${a.points}`}
                    size="small"
                    sx={{
                      backgroundColor: a.unlocked ? "#ea3b15" : "#eee",
                      color: a.unlocked ? "#fff" : "#888",
                      fontWeight: 500,
                      fontSize: "12px",
                    }}
                  />
                </Box>
              ))}

              {/* Verified Section */}
              {totalPoints >= 100 ? (
                <Box mt={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      padding: "10px",
                      borderRadius: 2,
                      border: "2px dotted #ea3b15",
                      backgroundColor: "#fff3f1",
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#ea3b15", fontSize: 24 }} />
                    <Typography fontWeight={600} fontSize={14} color="#ea3b15">
                      You’re Verified — enjoy exclusive features!
                    </Typography>
                  </Box>

                  <Typography variant="body2" fontWeight={500} mb={1}>
                    Verified Features:
                  </Typography>

                  {[
                    "Priority in search results",
                    "Unlimited messaging",
                    "Advanced profile analytics",
                    "Pin top research or projects",
                    "Custom tags and banners",
                    "Early access to new features"
                  ].map((feature, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        padding: "8px",
                        mb: 1,
                        border: "1px solid #eee",
                        borderRadius: 2,
                        backgroundColor: "#fdfdfd",
                      }}
                    >
                      <EmojiEventsIcon sx={{ fontSize: 20, color: "#ea3b15" }} />
                      <Typography fontSize={13}>{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box mt={2}>
                  <Typography fontSize={13} color="#888" mb={1}>
                    Earn 100 points to get verified.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography fontSize={13} fontWeight={500}>
                      {totalPoints}/100
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(totalPoints, 100)}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#eee",
                          "& .MuiLinearProgress-bar": { backgroundColor: "#ea3b15" },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAchievements;
