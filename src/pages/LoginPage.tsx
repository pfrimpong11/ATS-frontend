import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/background.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    grant_type: "password",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
  
    console.log("Form Data before sending:", formData);
  
    try {
      if (!formData.username || !formData.password) {
        setErrorMessage("Username and password are required.");
        return;
      }
  
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/token`,
        qs.stringify(formData), // Use qs to stringify the data
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      const token = response.data.access_token;
      sessionStorage.setItem("token", token);
  
      console.log("Login successful:", response.data.msg);
      navigate("/ResumeJobUpload");
    } catch (error: any) {
      console.error("Error response:", error.response);
  
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessages = error.response.data.detail.map((err: any) => {
          return `${err.loc[1]}: ${err.msg}`;
        });
        setErrorMessage(errorMessages.join(", "));
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };
    
  // navigate("/ResumeJobUpload")


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
  };

  return (
    <div style={pageStyle} className="login-container">
      <div style={formContainerStyle}>
        <div style={logoStyle}>
          <img src={logo} alt="jobmatch Logo" width="100" height="100" />
        </div>
        <h1 style={titleStyle}>Login to JobMatch</h1>
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
              className="login-input"
            />
            <User size={20} style={iconStyle} />
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
              className="login-input"
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
          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
          <button
            type="submit"
            style={buttonStyle}
            className="login-button"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0845c9";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a href="/ForgotPasswordPage" style={linkStyle} className="login-link">
            Forgot Password?
          </a>
        </div>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account?{" "}
          <a href="/RegisterPage" style={linkStyle} className="login-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;