import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/background.png';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrorMessage(null);
  };

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    const { username, name, email, password, confirmPassword, agreeToTerms } = formData;
    if (!username || !name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
        setErrorMessage("You must agree to the Terms and Conditions.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/register`, {
        username: formData.username,
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      const token = response.data.access_token;
      sessionStorage.setItem("token", token);
    
      navigate("/LoginPage");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
      console.error("There was an error registering the user:", error);
    } finally {
      setIsLoading(false);
    }
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
    maxWidth: "500px",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const errorStyle: React.CSSProperties = {
    color: "#E53E3E",
    fontSize: "14px",
    marginTop: "10px",
    textAlign: "center",
  };

  const linkStyle: React.CSSProperties = {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease",
    cursor: 'pointer',
  };

  const checkboxStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div style={pageStyle} className="register-container">
      <div style={formContainerStyle}>
        <div style={logoStyle}>
          <img src={logo} alt="Jobfit Ai Logo" width="100" height="100" />
        </div>
        <h1 style={titleStyle}>Sign Up</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label htmlFor="username" style={labelStyle}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
              className="register-input"
            />
            <User size={20} style={iconStyle} />
          </div>
          <div style={inputContainerStyle}>
            <label htmlFor="name" style={labelStyle}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              className="register-input"
            />
            <User size={20} style={iconStyle} />
          </div>
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
              className="register-input"
            />
            <Mail size={20} style={iconStyle} />
          </div>
          <div style={inputContainerStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              className="register-input"
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
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
              className="register-input"
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
          <div style={checkboxStyle}>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms">
              I agree to the <a onClick={() => {navigate("/TermsAndConditions")} } style={linkStyle}>Terms and Conditions</a>
            </label>
          </div>
          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
          <button
            type="submit"
            style={buttonStyle}
            className="register-button"
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "#0845c9";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {isLoading ? (
              <Loader className="animate-spin mr-2" size={20} />
            ) : null}
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account? <a onClick={() => {navigate("/LoginPage")}} style={linkStyle} className="register-link">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;