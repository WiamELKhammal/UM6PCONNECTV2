import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import "bulma/css/bulma.min.css";

import TopNavBar from "./components/TopNavBar";
import SubNavBar from "./components/SubNavBar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { UserProvider } from "./context/UserContext";
import ChangeYourTempPass from "./pages/ChangeYourTempPass";
import ProgramsParent from "./pages/Programs/ProgramsParent";
import ProgressReport2021 from "./pages/ProgressReport2021";
import VerifyEmailPage from "./pages/VerifyEmailPage";

import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileContainer from "./pages/Profile/ProfileContainer";
import CompleteProfileStepper from "./pages/CompleteProfileStepper/CompleteProfileStepper";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OurVision from "./pages/OurVision/OurVision";
import MeetEngageR from "./pages/MeetEngageR/MeetEngageR";

import HomePage from "./pages/Home/HomePage";
import UserProfile from "./pages/Home/Userprofile/Userprofile";
import MessageParent from "./components/Messages/MessageParent";
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute"; 

const Layout = () => {
  const location = useLocation();

  const hideNavAndFooterRoutes = [
    "/signup",
    "/signin",
    "/complete-profile",
    "/forgot-password",
    "/reset-password/:token",
    "/ChangeYourTempPass",
    "/messages",
    "/verify-email",
  ];

  const showSubNavBar =
    location.pathname.startsWith("/Our-Researchers") ||
    location.pathname.startsWith("/Userprofile") ||
    location.pathname.startsWith("/profile");

  return (
    <>
      {!hideNavAndFooterRoutes.includes(location.pathname) && (
        <>
          <TopNavBar />
          {showSubNavBar && (
            <Box sx={{ position: "sticky", top: "50px", zIndex: 1100 }}>
              <SubNavBar />
            </Box>
          )}
        </>
      )}

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/StudyAndLiveAtUM6P" element={<ProgressReport2021 />} />
        <Route path="/OurVision" element={<OurVision />} />
        <Route path="/OurFieldsOfWork" element={< MeetEngageR />} />

       
        <Route path="/Our-Researchers" element={<HomePage />} />
        <Route path="/Userprofile/:userId" element={<UserProfile />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/ChangeYourTempPass" element={<ChangeYourTempPass />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        <Route path="/ProfilePage" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/Our-Programs" element={<PrivateRoute><ProgramsParent /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfileContainer /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><MessageParent /></PrivateRoute>} />
        <Route
          path="/complete-profile"
          element={
            
              <CompleteProfileStepper />
            
          }
        />
      </Routes>

      {!hideNavAndFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Layout />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
