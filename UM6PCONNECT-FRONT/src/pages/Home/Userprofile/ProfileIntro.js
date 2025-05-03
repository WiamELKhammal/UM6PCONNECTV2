import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { UserContext } from "../../../context/UserContext";
import Follow from "../../Follow/Follow";
import MessageModal from "../../../components/Messages/MessageModal";

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
          fontSize={18}
          color="#111827"
          underline="hover"
        >
          {username}
        </MuiLink>
      ) : (
        <Typography fontSize={18} color="#999">
          Not provided
        </Typography>
      )}
    </Box>
  );
};

const PublicProfileIntro = ({ userId }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useContext(UserContext); // logged-in user
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  if (!userProfile) return <div>Loading...</div>;

  const profilePic = userProfile?.profilePicture || "/assets/images/default-profile.png";
  const coverPic = userProfile?.coverPicture || "/assets/images/default-cover.png";

  return (
    <Box pt={6}>
      <Paper
        elevation={0}
        sx={{
          width: "90%",
          margin: "0px auto",
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
              height: 200,
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        {/* Profile Picture + Info */}
        <Box mt={-6} px={4} pb={4}>
          <Stack alignItems="flex-start" spacing={1}>
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
            </Box>

            {/* Name + Elite Badge + Actions */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                mt: 1,
                gap: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Typography fontSize={26} fontWeight="600" color="#000">
                  {userProfile.Prenom} {userProfile.Nom}
                </Typography>

                {userProfile?.badged ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      border: "2px dotted #ffbf00",
                      borderRadius: "20px",
                      px: 2,
                      py: 0.5,
                      backgroundColor: "#fff",
                    }}
                  >
                    <WorkspacePremiumIcon sx={{ color: "#ffbf00", fontSize: 22 }} />
                    <Typography fontSize={14} fontWeight={600} color="#ffbf00">
                      Elite Member
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      border: "2px dotted #999",
                      borderRadius: "20px",
                      px: 2,
                      py: 0.5,
                      backgroundColor: "#fff",
                    }}
                  >
                    <WorkspacePremiumIcon sx={{ color: "#999", fontSize: 22 }} />
                    <Typography fontSize={14} fontWeight={500} color="#999">
                      Not Elite Yet
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Follow & Connect Buttons */}
              <Box display="flex" gap={1}>
                {!user ? (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="outlined"
                    startIcon={<ChatBubbleOutlineIcon fontSize="small" />}
                    sx={{
                      border: "1px solid #ea3b15",
                      color: "#fff",
                      backgroundColor: "#ea3b15",
                      fontSize: "13px",
                      textTransform: "none",
                    }}
                  >
                    Connect
                  </Button>
                ) : (
                  <>
                    <Follow user={user} researcherId={userId} />
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      variant="outlined"
                      startIcon={<ChatBubbleOutlineIcon fontSize="small" />}
                      sx={{
                        border: "1px solid #ea3b15",
                        color: "#fff",
                        backgroundColor: "#ea3b15",
                        fontSize: "13px",
                        textTransform: "none",
                      }}
                    >
                      Connect
                    </Button>
                  </>
                )}
              </Box>
            </Box>

            {/* Headline */}
            {userProfile.headline && (
              <Typography fontSize={18} color="text.secondary">
                {userProfile.headline}
              </Typography>
            )}

            {/* Department */}
            {userProfile.Departement && (
              <Box display="flex" alignItems="center" gap={1}>
                <ApartmentIcon fontSize="medium" />
                <Typography fontSize={18} color="#000">
                  {userProfile.Departement}
                </Typography>
              </Box>
            )}

            {/* Social Links */}
            <Box mt={2}>
              <Stack spacing={1}>
                <InfoLine
                  value={userProfile.linkedIn}
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
                  value={userProfile.researchGate}
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

      {/* Connect Modal */}
      {isModalOpen && (
        <MessageModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recipientId={userProfile._id}
          recipientName={`${userProfile.Prenom} ${userProfile.Nom}`}
        />
      )}
    </Box>
  );
};

export default PublicProfileIntro;
