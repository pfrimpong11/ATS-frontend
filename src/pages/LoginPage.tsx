"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      if (!formData.username || !formData.password) {
        setErrorMessage("Username and password are required.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/token`,
        qs.stringify(formData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;
      sessionStorage.setItem("token", token);

      navigate("/app");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-4 text-3xl font-bold tracking-tighter">
              Jobfit&nbsp;{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AI
              </span>
            </div>
            <h1 className="text-3xl font-bold text-center text-white mb-8">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <div className="relative mt-1">
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10 bg-white/70 border-white/30 text-black placeholder-white/90"
                    placeholder="Enter your username"
                  />
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                    size={18}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 bg-white/70 border-white/30 text-black placeholder-white/90"
                    placeholder="Enter your password"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                    size={18}
                  />
                  {showPassword ? (
                    <EyeOff
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                      size={18}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                      size={18}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-400 text-sm text-center">
                  {errorMessage}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-400 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-white">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
