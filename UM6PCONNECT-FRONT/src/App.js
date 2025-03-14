import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import "bulma/css/bulma.min.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LandingPage2 from "./pages/LandingPage2";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage"; // Import SignInPage
import { UserProvider } from "./context/UserContext";
import ChangeYourTempPass from "./pages/ChangeYourTempPass"; 
import ProgramsParent from "./pages/Programs/ProgramsParent";

import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileContainer from "./pages/Profile/ProfileContainer";
import HomePage from "./pages/Home/HomePage";
import UserProfile from "./pages/Home/Userprofile/Userprofile";
import UserList from "./components/UserList";
const Layout = () => {
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Hide Navbar on SignUp, SignIn, and Changepassword Pages */}
      {!["/signup", "/signin", "/ChangeYourTempPass"].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/ChangeYourTempPass" element={<ChangeYourTempPass />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/LandingPage2" element={<LandingPage2 />} />
        <Route path="/programs" element={<ProgramsParent />} />
        <Route path="/profile" element={<ProfileContainer />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Userprofile/:userId" element={<UserProfile />} />

        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
    </>
  );
};



const App = () => {
  return (
    <UserProvider>
      <Router>
        <Layout />
      </Router>
    </UserProvider>
  );
};

export default App;
