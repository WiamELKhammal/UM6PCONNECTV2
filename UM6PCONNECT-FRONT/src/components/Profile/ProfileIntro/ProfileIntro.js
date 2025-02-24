import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import "bulma/css/bulma.min.css";
import { LocationOn, Email, Phone, Language } from "@mui/icons-material";
import { Button } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
// Ensure the correct import style for ProfileSetup
import ProfileSetup from "./ProfileSetup"; // Adjust the path if necessary

const ProfileIntro = () => {
  const { user } = useContext(UserContext);

  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const fullName = user ? `${user.Prenom} ${user.Nom}` : "Guest";
  const profilePic = user?.profilePic || "/assets/images/default-profile.png";
  const coverPic = user?.coverPic || "/assets/images/default-cover.png";
  const location = user?.location;
  const departement = user?.Departement;
  const email = user?.Email;
  const phone = user?.phone;
  const website = user?.website;
  const profession = user?.profession;

  return (
    <div className="container py-5 ">
      <div
        className="box"
        style={{
          width: "90%",
          margin: "0 auto",
          border: "2px solid #ddd",
          borderRadius: "10px",
          padding: "0",
          overflow: "hidden",
          fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
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
          {/* Profile Picture */}
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
            </figure>
          </div>
        </div>
        {/* User Info */}
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
            {/* Edit Profile Button */}
            <Button
              variant="outlined"
              sx={{
                color: "#d84b2b",
                borderColor: "#d84b2b",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
                padding: "6px 16px", // Added padding for a better look
                mt: 1,
                whiteSpace: "nowrap", // Prevents text wrapping
                "&:hover": { backgroundColor: "#ffff" },
              }}
              onClick={() => setIsProfileSetupOpen(true)}
            >
              Edit Profile
            </Button>
          </div>
          {profession && (
            <p
              className="subtitle is-6"
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "15px",
              }}
            >
              {profession}
            </p>
          )}
          <div
            style={{
              fontSize: "14px",
              color: "#444",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {departement && (
              <span className="is-flex is-align-items-center">
                <BusinessIcon fontSize="small" style={{ color: "#555", marginRight: "5px" }} />
                {departement}
              </span>
            )}
          </div>
          {/* Contact Info */}
          <div
            style={{
              fontSize: "14px",
              color: "#444",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {location && (
              <span className="is-flex is-align-items-center">
                <LocationOn fontSize="small" style={{ color: "#555", marginRight: "5px" }} />
                {location}
              </span>
            )}
            {email && (
              <span className="is-flex is-align-items-center">
                <Email fontSize="small" style={{ color: "#555", marginRight: "5px" }} />
                <a href={`mailto:${email}`} style={{ textDecoration: "none", color: "#555" }}>
                  {email}
                </a>
              </span>
            )}
            {phone && (
              <span className="is-flex is-align-items-center">
                <Phone fontSize="small" style={{ color: "#555", marginRight: "5px" }} />
                {phone}
              </span>
            )}
          </div>
          {/* Website */}
          {website && (
            <div style={{ marginTop: "10px", fontSize: "14px", color: "#444" }}>
              <span className="is-flex is-align-items-center">
                <Language fontSize="small" style={{ color: "#555", marginRight: "5px" }} />
                <a href={website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#555" }}>
                  {website}
                </a>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Conditionally render ProfileSetup */}
      {isProfileSetupOpen && <ProfileSetup />}
    </div>
  );
};

export default ProfileIntro;
