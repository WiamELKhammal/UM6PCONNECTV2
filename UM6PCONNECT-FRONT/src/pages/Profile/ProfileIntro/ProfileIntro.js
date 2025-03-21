import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { Button, IconButton, Box, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import ProfileSetup from "./ProfileSetup";
import EditProfilePic from "./EditProfilePic";
import EditCoverPic from "./EditCoverPic";
import ContactInfoModal from "./ContactInfoModal";

const ProfileIntro = () => {
  const { user, setUser } = useContext(UserContext); // ✅ Get setUser to update context instantly

  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [isEditProfilePicOpen, setIsEditProfilePicOpen] = useState(false);
  const [isEditCoverPicOpen, setIsEditCoverPicOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);

  const fullName = user ? `${user.Prenom} ${user.Nom}` : "Guest";

  const profilePic = user?.profilePicture || "/assets/images/default-profile.png";
  const coverPic = user?.coverPicture || "/assets/images/default-cover.png";

  const bio = user?.bio;
  const headline = user?.headline;
  const departement = user?.Departement;

  return (
    <div className="container py-5">
      <div
        className="box"
        style={{
          width: "90%",
          margin: "0 auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "0",
          overflow: "hidden",
          position: "relative",
          boxShadow: "none",
        }}
      >
        {/* Cover Image */}
        <div
          style={{
            backgroundImage: `url(${coverPic})`,
            height: "250px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px 10px 0 0",
            position: "relative",
          }}
        >
          {/* Edit Cover Button */}
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

          {/* Profile Picture */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-40px",
              left: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "5px solid white",
                position: "relative",
              }}
            >
              <img
                src={profilePic}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Edit Profile Picture Button */}
              <IconButton
                onClick={() => setIsEditProfilePicOpen(true)}
                sx={{
                  position: "absolute",
                  bottom: "5px",
                  right: "5px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </div>

        {/* User Information */}
        <div className="ml-5 mt-6" style={{ padding: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5">{fullName}</Typography>

            {/* Edit Profile Button */}
            <Button
              variant="outlined"
              sx={{
                color: "#ea3b15",
                borderColor: "#ea3b15",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
                padding: "6px 16px",
                mt: 1,
                "&:hover": { backgroundColor: "#fff" },
                boxShadow: "none",
              }}
              onClick={() => setIsProfileSetupOpen(true)}
            >
              Edit Profile
            </Button>
          </Box>

          {/* Headline */}
          {headline && (
            <Typography variant="subtitle1" sx={{ fontSize: "14px", color: "#000", mb: 1 }}>
              {headline}
            </Typography>
          )}

          {/* Department */}
          {departement && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "14px", color: "#000" }}>
              <BusinessIcon fontSize="small" />
              {departement}
            </Box>
          )}

          {/* Bio */}
          {bio && (
            <Typography sx={{ fontSize: "14px", color: "#333", mt: 2, lineHeight: "1.5" }}>
              {bio}
            </Typography>
          )}

          {/* Contact Info Button */}
          <Button
            onClick={() => setIsContactInfoOpen(true)}
            sx={{
              backgroundColor: "#ea3b15",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
              padding: "6px 16px",
              "&:hover": { backgroundColor: "#c43b2a" },
              boxShadow: "none",
              mt: 2,
            }}
          >
            Contact Info
          </Button>
        </div>
      </div>

      {/* Modals */}
      {isProfileSetupOpen && <ProfileSetup onClose={() => setIsProfileSetupOpen(false)} />}
      {isEditProfilePicOpen && <EditProfilePic onClose={() => setIsEditProfilePicOpen(false)} updateUser={setUser} />}
      {isEditCoverPicOpen && <EditCoverPic onClose={() => setIsEditCoverPicOpen(false)} updateUser={setUser} />}

      {isContactInfoOpen && (
        <ContactInfoModal open={isContactInfoOpen} onClose={() => setIsContactInfoOpen(false)} onSave={() => setIsContactInfoOpen(false)} />
      )}
    </div>
  );
};

export default ProfileIntro;
