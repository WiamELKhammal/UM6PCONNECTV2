import React from "react";
import { useParams } from "react-router-dom";
import Education from "./Education";
import Experience from "./Experience";
import Languages from "./Languages";
import LicensesCertifications from "./LicensesCertifications";
import Projects from "./Projects";
import ProfileIntro from "./ProfileIntro";

const UserProfile = () => {
    const { userId } = useParams(); // Get the user ID from the URL

    return (
        <div 
            style={{ 
                minHeight: "100vh", 
                display: "flex", 
                flexDirection: "column", 
                paddingTop: "80px" ,
                backgroundColor: "#fafafa" // Correct way to apply background color
            }}
        >
            <div className="container" style={{ flex: 1 }}>
                <ProfileIntro userId={userId} />
                <Experience userId={userId} />
                <Education userId={userId} />
                <Projects userId={userId} />
                <LicensesCertifications userId={userId} />
                <Languages userId={userId} />
            </div>
        </div>
    );
};

export default UserProfile;
