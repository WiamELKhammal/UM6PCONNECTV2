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

import ProfilePage from "./components/Profile/ProfilePage";

const Layout = () => {
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Hide Navbar on SignUp, SignIn, and Changepassword Pages */}
      {!["/signup", "/signin", "/ChangeYourTempPass"].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LandingPage2" element={<LandingPage2 />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/ChangeYourTempPass" element={<ChangeYourTempPass />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />

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
