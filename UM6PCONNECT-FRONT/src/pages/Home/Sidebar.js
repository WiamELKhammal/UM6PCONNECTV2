import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Card, CardContent, Typography, LinearProgress, Box, CircularProgress } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [missingFields, setMissingFields] = useState([]);
  const [completedFields, setCompletedFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/complete/profile/${user._id}`);
          if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

          const data = await response.json();
          if (data) {
            setCompletionPercentage(parseFloat(data.completionPercentage) || 0);
            setMissingFields(data.missingFields || []);

            const allFields = [
              "First Name", "Last Name", "Email", "Bio", "Headline", "Location", "Address", "Birth Date",
              "URL", "Profile Picture", "Cover Picture", "Education", "Experience", "Language", "License", "Project"
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
    "Email": "Add your email",
    "Bio": "Write a bio about yourself",
    "Headline": "Set up your profile headline",
    "Location": "Add your current location",
    "Address": "Fill in your address",
    "Birth Date": "Provide your birth date",
    "URL": "Add your personal or business URL",
    "Profile Picture": "Upload a profile picture",
    "Cover Picture": "Set a cover picture",
    "Education": "Add your education details",
    "Experience": "List your work experience",
    "Language": "Mention the languages you speak",
    "License": "Add your certifications or licenses",
    "Project": "Showcase your projects"
  };

  const displayMissingFields = missingFields.slice(0, 4);
  const remainingSlots = 4 - displayMissingFields.length;
  const displayCompletedFields = completedFields.slice(0, remainingSlots);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
      <Card sx={{ width: 360, borderRadius: 3, boxShadow: "none", border: "1px solid #ddd", backgroundColor: "#fff", padding: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Complete Your Profile
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Improve your visibility by completing all sections.
          </Typography>

          {/* Progress Bar with Completion Percentage on the Left */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", minWidth: 40 }}>
              {completionPercentage}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{ flexGrow: 1, height: 8, borderRadius: 4, backgroundColor: "#efeef1", "& .MuiLinearProgress-bar": { backgroundColor: "#d84b2b" } }}
            />
          </Box>

          {displayMissingFields.map((field, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 4, padding: "10px", mb: 1, border: "1px solid #ededed", backgroundColor: "#f8f8f8" }}>
              <TaskAltIcon sx={{ color: "grey", fontSize: 24 }} />
              <Typography variant="body2" sx={{ flexGrow: 1, marginLeft: "10px", color: "black" }}>
                {fieldSentences[field] || `Complete your ${field}`}
              </Typography>
              <ArrowCircleRightOutlinedIcon sx={{ color: "#d84b2b", fontSize: 24, borderRadius: "50%" }} />
            </Box>
          ))}

          {displayCompletedFields.map((field, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 4, padding: "10px", border: "1px solid #ededed", mb: 1, backgroundColor: "#fff" }}>
              <TaskAltIcon sx={{ color: "#d84b2b", fontSize: 24 }} />
              <Typography variant="body2" sx={{ flexGrow: 1, marginLeft: "10px", textDecoration: "line-through", color: "#908f95" }}>
                {field}
              </Typography>
              <ArrowCircleRightOutlinedIcon sx={{ color: "#898890", fontSize: 24 }} />
            </Box>
          ))}

          {/* View More Section (Always Present) */}
          <Box sx={{ textAlign: "left", mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#d84b2b", cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              View More
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
