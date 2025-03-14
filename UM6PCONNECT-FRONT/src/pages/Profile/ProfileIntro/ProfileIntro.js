import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import "bulma/css/bulma.min.css";
import { LocationOn, Email, Phone, Edit, Language } from "@mui/icons-material";
import { Button, IconButton, Modal, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import ProfileSetup from "./ProfileSetup";
import EditProfilePic from "./EditProfilePic";
import EditCoverPic from "./EditCoverPic";
import EditProfileForm from "./EditProfileForm"; // Import the EditProfileForm component
import ContactInfoModal from "./ContactInfoModal"; // Import the EditProfileForm component

const ProfileIntro = () => {
  const { user } = useContext(UserContext);

  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [isEditProfilePicOpen, setIsEditProfilePicOpen] = useState(false);
  const [isEditCoverPicOpen, setIsEditCoverPicOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false); // This controls opening the contact info modal

  const fullName = user ? `${user.Prenom} ${user.Nom}` : "Guest";
  const profilePic = user?.profilePic || "/assets/images/default-profile.png";
  const coverPic = user?.coverPic || "/assets/images/default-cover.png";

  const bio = user?.bio;
  const headline = user?.headline;
  const location = user?.location;
  const departement = user?.Departement;
  const email = user?.Email;
  const phone = user?.phone;
  const website = user?.url;
  const address = user?.address; // Added address

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
          fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
          position: "relative",
          boxShadow: "none",
        }}
      >
        {/* Image de couverture */}
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
          {/* Bouton d'édition pour l'image de couverture */}
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

          {/* Photo de profil */}
          <div style={{ position: "absolute", bottom: "-40px", left: "20px" }}>
            <figure
              className="image is-128x128"
              style={{
                borderRadius: "50%",
                border: "5px solid white",
                position: "relative",
              }}
            >
              <img src={profilePic} alt="Profile" className="is-rounded" />

              {/* Bouton d'édition pour la photo de profil */}
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
            </figure>
          </div>
        </div>

        {/* Infos utilisateur */}
        <div className="ml-5 mt-6" style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4
              className="title is-4"
              style={{
                fontWeight: "500",
                marginBottom: "5px",
              }}
            >
              {fullName}
            </h4>

            {/* Bouton Edit Profile */}
            <Button
              variant="outlined"
              sx={{
                color: "#d84b2b",
                borderColor: "#d84b2b",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
                padding: "6px 16px",
                mt: 1,
                whiteSpace: "nowrap",
                "&:hover": { backgroundColor: "#ffff" },
                boxShadow: "none", // No shadow for button
              }}
              onClick={() => setIsProfileSetupOpen(true)}
            >
              Edit Profile
            </Button>
          </div>

          {/* Headline */}
          {headline && (
            <p
              className="subtitle is-6"
              style={{
                fontSize: "14px",
                color: "#000",
                marginBottom: "10px",
                fontWeight: "500",
              }}
            >
              {headline}
            </p>
          )}

          {/* Département et autres infos */}
          <div
            style={{
              fontSize: "14px",
              color: "#000",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {departement && (
              <span className="is-flex is-align-items-center">
                <BusinessIcon fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                {departement}
              </span>
            )}
          </div>

          {/* Bio */}
          {bio && (
            <p
              style={{
                fontSize: "14px",
                color: "#333",
                marginTop: "10px",
                lineHeight: "1.5",
              }}
            >
              {bio}
            </p>
          )}

          {/* Contact Info Button */}
          <Button
            onClick={() => setIsContactInfoOpen(true)}
            sx={{
              backgroundColor: "#d84b2b",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
              padding: "6px 16px",
              "&:hover": { backgroundColor: "#c43b2a" },
              boxShadow: "none", // No shadow for button
              marginTop: "10px",
            }}
          >
            Contact Info
          </Button>
        </div>
      </div>

      {/* Modals */}
      {isProfileSetupOpen && <ProfileSetup onClose={() => setIsProfileSetupOpen(false)} />}
      {isEditProfilePicOpen && <EditProfilePic onClose={() => setIsEditProfilePicOpen(false)} />}
      {isEditCoverPicOpen && <EditCoverPic onClose={() => setIsEditCoverPicOpen(false)} />}

      {/* Contact Info Modal */}
      {isContactInfoOpen && (
        <ContactInfoModal open={isContactInfoOpen} onClose={() => setIsContactInfoOpen(false)} onSave={() => setIsContactInfoOpen(false)} />
      )}
    </div>
  );
};

export default ProfileIntro;
