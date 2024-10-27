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




const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      {/* <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
      <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} /> */}
      <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
      <Route path="/ResumeJobUpload" element={<ResumeJobUpload />} />
      <Route path="/JobMatchResult" element={<JobMatchResult />} />
    </Routes>
  );
};

export default AppRoutes;
