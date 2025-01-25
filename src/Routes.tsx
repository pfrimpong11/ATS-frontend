import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import ResumeJobUpload from "./pages/ResumeJobUpload";
import JobMatchResult from "./pages/JobMatchResult";
import ResumeJobMatchApp from "./pages/ResumeJobMatchApp";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/upload" element={<ResumeJobUpload />} />
      <Route path="/match-results" element={<JobMatchResult />} />
      <Route path="/app" element={<ResumeJobMatchApp />} />
    </Routes>
  );
};

export default AppRoutes;
