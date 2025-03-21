import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import { LocationOn, Email, Phone, Language } from "@mui/icons-material";
import { Button } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

const ProfileIntro = ({ userId }) => {
    const [user, setUser] = useState(null);

    // Fetch user data based on the userId
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;  
    }

    //  Ensure correct handling of profile and cover pictures
    const profilePic = user?.profilePicture
        ? user.profilePicture.startsWith("data:image")
            ? user.profilePicture
            : `data:image/png;base64,${user.profilePicture}`
        : "/assets/images/default-profile.png";

    const coverPic = user?.coverPicture
        ? user.coverPicture.startsWith("data:image")
            ? user.coverPicture
            : `data:image/png;base64,${user.coverPicture}`
        : "/assets/images/default-cover.png"; // Fallback default cover

    return (
        <div className="container py-5 ">
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
                {/* ✅ Cover Image (Ensures it loads properly) */}
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
                        <h4 className="title is-4" style={{ fontWeight: "500", marginBottom: "5px" }}>
                            {user.Prenom} {user.Nom}
                        </h4>

                        {/* Buttons */}
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button 
                                variant="contained"
                                style={{
                                    border: "1px solid #ea3b15",
                                    backgroundColor: "#ea3b15",
                                    color: "#fff",
                                    boxShadow: "none",
                                }}
                                size="small"
                            >
                                Message
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    border: "1px solid #ea3b15",
                                    backgroundColor: "white",
                                    color: "#ea3b15",
                                    boxShadow: "none",
                                }}
                                size="small"
                            >
                                Follow
                            </Button>
                        </div>
                    </div>

                    {/* Headline */}
                    {user.headline && (
                        <p className="subtitle is-6" style={{ fontSize: "14px", color: "#000", marginBottom: "10px", fontWeight: "500" }}>
                            {user.headline}
                        </p>
                    )}

                    {/* Department */}
                    {user.Departement && (
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
                            <span className="is-flex is-align-items-center">
                                <BusinessIcon fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                {user.Departement}
                            </span>
                        </div>
                    )}

                    {/* Bio */}
                    {user.bio && (
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#333",
                                marginTop: "10px",
                                lineHeight: "1.5",
                            }}
                        >
                            {user.bio}
                        </p>
                    )}

                    {/* Contact Info */}
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#000",
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            flexWrap: "wrap",
                            marginTop: "10px",
                        }}
                    >
                        {user.location && (
                            <span className="is-flex is-align-items-center">
                                <LocationOn fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                {user.location}
                            </span>
                        )}
                        {user.Email && (
                            <span className="is-flex is-align-items-center">
                                <Email fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                <a href={`mailto:${user.Email}`} style={{ textDecoration: "none", color: "#000" }}>
                                    {user.Email}
                                </a>
                            </span>
                        )}
                        {user.phone && (
                            <span className="is-flex is-align-items-center">
                                <Phone fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                {user.phone}
                            </span>
                        )}
                    </div>

                    {/* Website */}
                    {user.url && (
                        <div style={{ marginTop: "10px", fontSize: "14px", color: "#000" }}>
                            <span className="is-flex is-align-items-center">
                                <Language fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                <a href={user.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                                    {user.url}
                                </a>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileIntro;
