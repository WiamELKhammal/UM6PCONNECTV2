import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockClockIcon from "@mui/icons-material/LockClock";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { UserContext } from "../../context/UserContext";

const UserAchievements = () => {
  const { user, setUser } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [stats, setStats] = useState({
    following: 0,
    followers: 0,
    researchCount: 0,
    completedProfile: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id || !user.token) return;
  
      try {
        const headers = {
          Authorization: `Bearer ${user.token}`,
        };
  
        // 1. Get follow stats
        const followRes = await fetch(`https://um6pconnectv2-production.up.railway.app/api/follow/follow-count/${user._id}`, { headers })
          .then(res => res.json());
  
        // 2. Get research count
        const researchRes = await fetch(`https://um6pconnectv2-production.up.railway.app/api/research/user/${user._id}`, { headers })
          .then(res => res.json());
  
        // 3. Get profile completion
        const profileRes = await fetch(`https://um6pconnectv2-production.up.railway.app/api/complete/profile/${user._id}`, { headers })
          .then(res => res.json());
  
        const completed = parseFloat(profileRes?.completionPercentage) >= 100;
  
        setStats({
          following: followRes.followingCount,
          followers: followRes.followersCount,
          researchCount: researchRes.length,
          completedProfile: completed,
        });
  
        const shouldBadge =
          followRes.followersCount >= 10 &&
          followRes.followingCount >= 10 &&
          researchRes.length >= 10 &&
          completed;
  
        if (shouldBadge && !user.badged) {
          await fetch(`https://um6pconnectv2-production.up.railway.app/api/users/${user._id}/badge`, {
            method: "PUT",
            headers,
          });
  
          setUser({ ...user, badged: true });
        }
      } catch (err) {
        console.error("Error fetching achievements data:", err);
      }
    };
  
    fetchData();
  }, [user?._id]);
  
  
  const achievements = [
    {
      title: "Follow 10 users",
      points: 20,
      unlocked: stats.following >= 10,
    },
    {
      title: "Reach 10 followers",
      points: 50,
      unlocked: stats.followers >= 10,
    },
    {
      title: "Post 10 research entries",
      points: 10,
      unlocked: stats.researchCount >= 10,
    },
    {
      title: "Complete your profile",
      points: 20,
      unlocked: stats.completedProfile,
    },
  ];

  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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

  "Become a guest in Times of UM6P.  ",
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
