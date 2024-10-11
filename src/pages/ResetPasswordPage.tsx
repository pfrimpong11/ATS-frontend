import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/background.png';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // const params = new URLSearchParams(window.location.search);
  // const token = params.get('token');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { password, confirmPassword } = formData;

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
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

  return (
    <div style={pageStyle} className="reset-password-container">
      <div style={formContainerStyle}>
        <div style={logoStyle}>
          <img src={logo} alt="jobmatch Logo" width="100" height="100" />
        </div>
        <h1 style={titleStyle}>Reset Password</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label htmlFor="password" style={labelStyle}>
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              className="reset-password-input"
            />
            <Lock size={20} style={iconStyle} />
            {showPassword ? (
              <EyeOff
                size={20}
                style={{ ...iconStyle, left: "auto", right: "12px", cursor: "pointer" }}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                size={20}
                style={{ ...iconStyle, left: "auto", right: "12px", cursor: "pointer" }}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <div style={inputContainerStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm New Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
              className="reset-password-input"
            />
            <Lock size={20} style={iconStyle} />
            {showConfirmPassword ? (
              <EyeOff
                size={20}
                style={{ ...iconStyle, left: "auto", right: "12px", cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <Eye
                size={20}
                style={{ ...iconStyle, left: "auto", right: "12px", cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>
          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
          {successMessage && <p style={successStyle}>{successMessage}</p>}
          <button
            type="submit"
            style={buttonStyle}
            className="reset-password-button"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0845c9";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;