import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/background.png';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessage(null);
  };

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { email } = formData;
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    navigate("/LoginPage");
  };

  const pageStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
  };

  const formContainerStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    backdropFilter: "blur(10px)",
  };

  const logoStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
    textAlign: "center",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "5px",
  };

  const inputStyle: React.CSSProperties = {
    padding: "12px 40px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: "12px",
    top: "38px",
    color: "#888",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "14px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.1s ease",
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "14px",
    marginTop: "10px",
    textAlign: "center",
  };

  const errorStyle: React.CSSProperties = {
    ...messageStyle,
    color: "#E53E3E",
  };

  const successStyle: React.CSSProperties = {
    ...messageStyle,
    color: "#38A169",
  };

  const linkStyle: React.CSSProperties = {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  };

  return (
    <div style={pageStyle} className="forgot-password-container">
      <div style={formContainerStyle}>
        <div style={logoStyle}>
          <img src={logo} alt="jobmatch Logo" width="100" height="100" />
        </div>
        <h1 style={titleStyle}>Forgot Password</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              className="forgot-password-input"
            />
            <Mail size={20} style={iconStyle} />
          </div>
          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
          {successMessage && <p style={successStyle}>{successMessage}</p>}
          <button
            type="submit"
            style={buttonStyle}
            className="forgot-password-button"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0845c9";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Send Reset Link
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Remembered your password? <a href="/LoginPage" style={linkStyle} className="forgot-password-link">Sign in</a>
        </p>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account? <a href="/RegisterPage" style={linkStyle} className="forgot-password-link">Register</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;