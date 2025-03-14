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
        return <div>Loading...</div>;  // Optionally, show loading indicator until user data is fetched
    }

    const fullName = `${user.Prenom} ${user.Nom}`;
    const profilePic = user?.profilePic || "/assets/images/default-profile.png";
    const coverPic = user?.coverPic || "/assets/images/default-cover.png";

    const bio = user?.bio;
    const headline = user?.headline;
    const location = user?.location;
    const departement = user?.Departement;
    const email = user?.Email;
    const phone = user?.phone;
    const website = user?.url;

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

                        {/* Message and Follow buttons */}
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button 
                             variant="contained"
                                style={{
                                    border: "1px solid #d84b2b",
                                    backgroundColor: "#d84b2b",
                                    color: "#fff",
                                    boxShadow: "none",
                                }}
                                size="small">
                                Message
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    border: "1px solid #d84b2b",
                                    backgroundColor: "white",
                                    color: "#d84b2b",
                                    boxShadow: "none",
                                }}
                                size="small"
                            >
                                Follow
                            </Button>
                        </div>

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
                        {location && (
                            <span className="is-flex is-align-items-center">
                                <LocationOn fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                {location}
                            </span>
                        )}
                        {email && (
                            <span className="is-flex is-align-items-center">
                                <Email fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                <a href={`mailto:${email}`} style={{ textDecoration: "none", color: "#000" }}>
                                    {email}
                                </a>
                            </span>
                        )}
                        {phone && (
                            <span className="is-flex is-align-items-center">
                                <Phone fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                {phone}
                            </span>
                        )}
                    </div>

                    {/* Website */}
                    {website && (
                        <div style={{ marginTop: "10px", fontSize: "14px", color: "#000" }}>
                            <span className="is-flex is-align-items-center">
                                <Language fontSize="small" style={{ color: "#000", marginRight: "5px" }} />
                                <a href={website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                                    {website}
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
