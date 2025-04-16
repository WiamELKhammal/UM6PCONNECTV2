import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  CircularProgress,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [missingFields, setMissingFields] = useState([]);
  const [completedFields, setCompletedFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/complete/profile/${user._id}`
          );
          if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

          const data = await response.json();
          if (data) {
            setCompletionPercentage(parseFloat(data.completionPercentage) || 0);
            setMissingFields(data.missingFields || []);

            const allFields = [
              "First Name", "Last Name", "Headline", "Profile Picture",
              "Cover Picture", "Departement", "LinkedIn", "ResearchGate", "Experience"
            ];
            const completed = allFields.filter(field => !data.missingFields.includes(field));
            setCompletedFields(completed);
          } else {
            setError("Failed to fetch profile data.");
          }
        } catch (error) {
          setError("Something went wrong while fetching profile data.");
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } else {
      setLoading(false);
      setError("User not logged in.");
    }
  }, [user]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const fieldSentences = {
    "First Name": "Add your first name",
    "Last Name": "Add your last name",
    "Headline": "Set up your profile headline",
    "Profile Picture": "Upload a profile picture",
    "Cover Picture": "Set a cover picture",
    "Departement": "Select your department",
    "LinkedIn": "Add your LinkedIn profile",
    "ResearchGate": "Add your ResearchGate link",
    "Experience": "List your work experience"
  };

  const displayMissingFields = missingFields.slice(0, 4);
  const remainingSlots = 4 - displayMissingFields.length;
  const displayCompletedFields = completedFields.slice(0, remainingSlots);

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
                Complete Your Profile
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
              Improve your visibility by completing all sections below.
            </Typography>
          </Box>

          {expanded && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", minWidth: 40 }}>
                  {completionPercentage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{
                    flexGrow: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#efeef1",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#e04c2c" },
                  }}
                />
              </Box>

              {displayMissingFields.map((field, index) => (
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
                  <TaskAltIcon sx={{ color: "grey", fontSize: 24 }} />
                  <Typography
                    variant="body2"
                    sx={{ flexGrow: 1, marginLeft: "10px", color: "black" }}
                  >
                    {fieldSentences[field] || `Complete your ${field}`}
                  </Typography>
                  <ArrowCircleRightOutlinedIcon sx={{ color: "#e04c2c", fontSize: 24 }} />
                </Box>
              ))}

              {displayCompletedFields.map((field, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 4,
                    padding: "10px",
                    border: "1px solid #ededed",
                    mb: 1,
                    backgroundColor: "#fff",
                  }}
                >
                  <TaskAltIcon sx={{ color: "#e04c2c", fontSize: 24 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      flexGrow: 1,
                      marginLeft: "10px",
                      textDecoration: "line-through",
                      color: "#908f95",
                    }}
                  >
                    {field}
                  </Typography>
                  <ArrowCircleRightOutlinedIcon sx={{ color: "#898890", fontSize: 24 }} />
                </Box>
              ))}

              <Box sx={{ textAlign: "left", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#e04c2c", cursor: "pointer" }}
                  onClick={() => navigate("/profile")}
                >
                  View More
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
