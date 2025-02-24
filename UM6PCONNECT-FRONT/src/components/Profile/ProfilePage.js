import React from "react";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";
import Languages from "./Languages/Languages";
import LicensesCertifications from "./LicensesCertifications/LicensesCertifications";
import Tags from "./Tags/Tags";
import Publications from "./Publications/Publications";


const ProfilePage = () => {
  return (
    <div className="container">
      <ProfileIntro />
      <Education />
      <Languages/>
      <Projects />
      <Experience />
      <LicensesCertifications />
      <Publications />
      <Tags />

      
    </div>
  );
};

export default ProfilePage;
