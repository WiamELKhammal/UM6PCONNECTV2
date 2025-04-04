import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const ProfileCard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;

  const badgeStyles = user.badged
    ? {
        backgroundColor: "#fff",
        color: "#ffbf00",
        iconColor: "#ffbf00",
      }
    : {
        backgroundColor: "#fff",
        color: "#888",
        iconColor: "#ccc",
      };

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
        {/* Cover Image */}
        <Box
          component="img"
          src={user.coverPicture || "/assets/images/default-cover.png"}
          alt="Cover"
          sx={{
            width: "100%",
            height: 80,
            objectFit: "cover",
          }}
        />

        {/* Avatar */}
        <Box sx={{ px: 2, mt: -5, display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={user.profilePicture || "/assets/images/default-profile.png"}
              alt={`${user.Prenom} ${user.Nom}`}
              sx={{
                width: 80,
                height: 80,
                border: "3px solid #fff",
              }}
            />
            {user.openToWork && (
              <Chip
                label="#OPENTOWORK"
                size="small"
                sx={{
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  backgroundColor: "#61b15a",
                  color: "#fff",
                  fontSize: "10px",
                  borderRadius: "8px",
                  px: 1,
                }}
              />
            )}
          </Box>
        </Box>

        <CardContent sx={{ pt: 1 }}>
          {/* Name + Elite Badge + Edit */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontWeight="bold" fontSize={16}>
                {user.Prenom} {user.Nom}
              </Typography>

              {/* Always show badge (gold if elite, grey otherwise) */}
              <Box
                display="flex"
                alignItems="center"
                gap={0.5}
                sx={{
                  border: badgeStyles.border,
                  borderRadius: "12px",
                  px: 1,
                  py: 0.3,
                  backgroundColor: badgeStyles.backgroundColor,
                }}
              >
                <WorkspacePremiumIcon sx={{ fontSize: 22, color: badgeStyles.iconColor }} />

              </Box>
            </Box>

            <IconButton
              size="small"
              sx={{ color: "#ea3b15" }}
              onClick={() => navigate("/profile")}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Headline */}
          {user.headline && (
            <Typography fontSize={14} sx={{ color: "#555", mt: 0.5 }}>
              {user.headline}
            </Typography>
          )}

          {/* Department */}
          {user.Departement && (
            <Typography fontSize={14} fontWeight={500} sx={{ mt: 0.5 }}>
              {user.Departement}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
