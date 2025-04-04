import React from "react";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import Experience from "./Experience/Experience";

import Tags from "./Tags/Tags";

const ProfilePage = () => {
  return (
    <div className="section has-background-light" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" ,paddingTop: "90px"}}>
      <div className="container" style={{ flex: 1 }}>
        <ProfileIntro />
        <Experience />
        <Tags />
      </div>
    </div>
  );
};

export default ProfilePage;


