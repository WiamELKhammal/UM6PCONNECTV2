import React from "react";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import Projects from "./Projects/Projects";
import Languages from "./Languages/Languages";
import LicensesCertifications from "./LicensesCertifications/LicensesCertifications";
import Tags from "./Tags/Tags";
import Publications from "./Publications/Publications";

const ProfilePage = () => {
  return (
    <div className="section has-background-light" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" ,paddingTop: "90px"}}>
      <div className="container" style={{ flex: 1 }}>
        <ProfileIntro />
        <Experience />
        <Education />
        <Publications />
        <Projects />
        <LicensesCertifications />
        <Languages />
        <Tags />
      </div>
    </div>
  );
};

export default ProfilePage;


