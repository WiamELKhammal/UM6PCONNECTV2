import React, { useState, useContext } from "react";
import {
  Button,
  IconButton,
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Link as MuiLink,
  Modal,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { UserContext } from "../../../context/UserContext";
import ProfileSetup from "./ProfileSetup";
import EditProfilePic from "./EditProfilePic";
import EditCoverPic from "./EditCoverPic";
import VerificationStepper from "../../VerificationStepper/VerificationStepper";

const extractUsername = (url) => {
  if (!url) return null;
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[parts.length - 1];
  } catch {
    return null;
  }
};

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
          fontSize={16}
          color="#111827"
          underline="hover"
          sx={{ wordBreak: "break-all" }} // ✅ prevent overflow
        >
          {username}
        </MuiLink>
      ) : (
        <Typography fontSize={16} color="#999">
          Not provided
        </Typography>
      )}
    </Box>
  );
};

const ProfileIntro = () => {
  const { user, setUser } = useContext(UserContext);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [isEditProfilePicOpen, setIsEditProfilePicOpen] = useState(false);
  const [isEditCoverPicOpen, setIsEditCoverPicOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const fullName = user ? `${user.Prenom} ${user.Nom}` : "Guest";
  const profilePic = user?.profilePicture || "/assets/images/default-profile.png";
  const coverPic = user?.coverPicture || "/assets/images/default-cover.png";
  const headline = user?.headline;
  const departement = user?.Departement;
  const linkedIn = user?.linkedIn;
  const researchGate = user?.researchGate;

  return (
    <Box pt={6}>
      <Paper
        elevation={0}
        sx={{
          width: "90%",
          maxWidth: "1200px",
          mx: "auto",
          borderRadius: 3,
          border: "1px solid #CCC",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Cover Image */}
        <Box position="relative" minHeight={200}>
          <Box
            component="img"
            src={coverPic}
            alt="Cover"
            sx={{
              width: "100%",
              height: { xs: 150, sm: 200 },
              objectFit: "cover",
              display: "block",
            }}
          />
          <IconButton
            onClick={() => setIsEditCoverPicOpen(true)}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>

        {/* Profile Picture + Info */}
        <Box mt={-6} px={3} pb={4}>
          <Stack spacing={2} alignItems="flex-start">
            {/* Avatar + Edit */}
            <Box position="relative">
              <Avatar
                src={profilePic}
                alt="Profile"
                sx={{
                  width: 100,
                  height: 100,
                  border: "3px solid white",
                  backgroundColor: "#eee",
                }}
              />
              <IconButton
                onClick={() => setIsEditProfilePicOpen(true)}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Box>

            {/* Name + Badge + Edit */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Typography fontSize={22} fontWeight="600" color="#000">
                  {fullName}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  onClick={() => {
                    if (!user?.badged) setIsVerificationOpen(true);
                  }}
                  sx={{
                    border: user?.badged ? "1px dotted #ffbf00" : "1px dotted #bbb",
                    borderRadius: "12px",
                    px: 1,
                    py: 0.3,
                    backgroundColor: user?.badged ? "#fff7d0" : "#f5f5f5",
                    cursor: user?.badged ? "default" : "pointer",
                  }}
                >
                  <WorkspacePremiumIcon
                    sx={{
                      fontSize: 20,
                      color: user?.badged ? "#ffbf00" : "#999",
                    }}
                  />
                  <Typography
                    fontSize={14}
                    fontWeight={500}
                    color={user?.badged ? "#ffbf00" : "#999"}
                  >
                    {user?.badged ? "Elite Member" : "Unlock Elite Badge"}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                onClick={() => setIsProfileSetupOpen(true)}
                sx={{
                  color: "#ea3b15",
                  borderColor: "#ea3b15",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "none",
                  minWidth: { xs: "100%", sm: "auto" }, // 📱 Full width on mobile
                  whiteSpace: "nowrap",
                }}
              >
                Edit Profile
              </Button>
            </Box>

            {/* Headline */}
            {headline && (
              <Typography fontSize={16} color="text.secondary">
                {headline}
              </Typography>
            )}

            {/* Department */}
            {departement && (
              <Box display="flex" alignItems="center" gap={1}>
                <ApartmentIcon fontSize="small" />
                <Typography fontSize={16} color="#000">
                  {departement}
                </Typography>
              </Box>
            )}

            {/* Social Links */}
            <Box mt={2} width="100%">
              <Stack spacing={1} direction="column">
                <InfoLine
                  value={linkedIn}
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
                  value={researchGate}
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

        {/* Modals */}
        {isProfileSetupOpen && (
          <ProfileSetup onClose={() => setIsProfileSetupOpen(false)} />
        )}
        {isEditProfilePicOpen && (
          <EditProfilePic onClose={() => setIsEditProfilePicOpen(false)} updateUser={setUser} />
        )}
        {isEditCoverPicOpen && (
          <EditCoverPic onClose={() => setIsEditCoverPicOpen(false)} updateUser={setUser} />
        )}
      </Paper>

      {/* Verification Modal */}
      <Modal open={isVerificationOpen} onClose={() => setIsVerificationOpen(false)}>
        <Box
          sx={{
            width: "90%",
            maxWidth: 500,
            mx: "auto",
            mt: "100px",
            borderRadius: 3,
            p: 3,
            bgcolor: "#fff",
            outline: "none",
          }}
        >
          <VerificationStepper onClose={() => setIsVerificationOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileIntro;
