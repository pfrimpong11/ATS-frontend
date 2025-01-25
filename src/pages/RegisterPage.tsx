"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {Link} from "react-router-dom"
import axios from "axios"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))
    setErrorMessage(null)
  }

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const { username, name, email, password, confirmPassword, agreeToTerms } = formData
    if (!username || !name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.")
      setIsLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!")
      setIsLoading(false)
      return
    }

    if (!agreeToTerms) {
      setErrorMessage("You must agree to the Terms and Conditions.")
      setIsLoading(false)
      return
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
    
      navigate("/login");
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
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-4 text-3xl font-bold tracking-tighter">
              Jobfit&nbsp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">AI</span>
            </div>
            <h1 className="text-3xl font-bold text-center text-white mb-8">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="pl-10 bg-white/70 border-white/30 text-black placeholder-black"
                    placeholder="Choose a username"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
                </div>
              </div>
              <div>
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <div className="relative mt-1">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 bg-white/70 border-white/30 text-black placeholder-black"
                    placeholder="Enter your full name"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-white/70 border-white/30 text-black placeholder-black"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
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
                    className="pl-10 bg-white/70 border-white/30 text-black placeholder-black"
                    placeholder="Create a password"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
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
              <div>
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 bg-white/70 border-white/30 text-black placeholder-black"
                    placeholder="Confirm your password"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 black" size={18} />
                  {showConfirmPassword ? (
                    <EyeOff
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                      size={18}
                      onClick={() => setShowConfirmPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                      size={18}
                      onClick={() => setShowConfirmPassword(true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                />
                <label htmlFor="agreeToTerms" className="text-sm text-white">
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {errorMessage && <p className="text-red-400 text-sm text-center">{errorMessage}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-400 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

