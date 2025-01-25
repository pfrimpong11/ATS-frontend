import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  X,
  LogOut,
} from "lucide-react";
import Background from "../assets/images/resume-upload.png";
import axios from "axios";
import qs from "qs";

const ResumeJobUpload: React.FC = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(
    null
  );
  const [jobDescriptionText, setJobDescriptionText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setResume(event.target.files[0]);
    }
  };

  const handleJobDescriptionFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setJobDescriptionFile(event.target.files[0]);
      setJobDescriptionText(""); // Reset text if file is uploaded
    }
  };

  const handleJobDescriptionTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJobDescriptionText(event.target.value);
    setJobDescriptionFile(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resume || (!jobDescriptionFile && !jobDescriptionText)) {
      setErrorMessage(
        "Please upload a resume and provide a job description (either as a file or text)."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Step 1: Upload Resume to extract the text
      const uploadFormData = new FormData();
      uploadFormData.append("resume_file", resume);

      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/upload_resume`,
        uploadFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      // console.log('Resume upload successful', uploadResponse);
      const resumeText = uploadResponse.data.resume_text; // Resume text received from backend

      let jobDescriptionContent = "";

      // Step 2: Handle Job Description File (if uploaded) to extract text
      if (jobDescriptionFile) {
        const jobDescriptionFormData = new FormData();
        jobDescriptionFormData.append("resume_file", jobDescriptionFile); // Use same endpoint for job description

        const jobDescUploadResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/upload_resume`, // endpoint to extract text from job description
          jobDescriptionFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        // console.log('Job description upload successful', jobDescUploadResponse);
        jobDescriptionContent = jobDescUploadResponse.data.resume_text; // Extracted text from the job description
      } else {
        jobDescriptionContent = jobDescriptionText; // Use manual input text
      }

      // Step 3: Match Resume and job description
      const matchPayload = {
        resume_text: resumeText,
        job_description: jobDescriptionContent,
      };
      // console.log(matchPayload);

      const matchResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/match_resume`,
        qs.stringify(matchPayload),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      // console.log('Match result:', matchResponse.data);

      setIsSuccess(true);
      navigate("/match-results", {
        state: { jobMatchData: matchResponse.data },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setResume(null);
    setJobDescriptionFile(null);
    setJobDescriptionText("");
    setErrorMessage("");
    setIsSuccess(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const renderForm = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Upload Your Application
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label htmlFor="resume" className="block text-gray-700 font-semibold">
            Upload Resume (PDF, DOC, or TXT)
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleResumeChange}
            className="hidden"
          />
          <label
            htmlFor="resume"
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <Upload size={20} />
            {resume ? "Change Resume" : "Select Resume"}
          </label>
          {resume && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText size={16} />
              <span>{resume.name}</span>
              <X
                size={16}
                className="text-red-500 cursor-pointer"
                onClick={() => setResume(null)}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Job Description
          </h3>

          <div className="space-y-4">
            <input
              type="file"
              id="jobDescriptionFile"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleJobDescriptionFileChange}
              disabled={!!jobDescriptionText}
              className="hidden"
            />
            <label
              htmlFor="jobDescriptionFile"
              className={`flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                jobDescriptionText
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FileText size={20} />
              {jobDescriptionFile
                ? "Change Job Description File"
                : "Upload Job Description File"}
            </label>
            {jobDescriptionFile && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText size={16} />
                <span>{jobDescriptionFile.name}</span>
                <X
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={() => setJobDescriptionFile(null)}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="jobDescriptionText"
              className="block text-gray-700 font-semibold"
            >
              Or Paste Job Description
            </label>
            <textarea
              id="jobDescriptionText"
              placeholder="Paste job description here..."
              value={jobDescriptionText}
              onChange={handleJobDescriptionTextChange}
              disabled={!!jobDescriptionFile}
              className={`w-full p-3 border rounded-lg min-h-[120px] resize-vertical ${
                jobDescriptionFile
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-gray-300"
              }`}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 bg-red-100 text-red-600 p-3 rounded-lg">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-blue-600 text-white rounded-lg font-bold transition-colors 
            ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative h-[300px] rounded-xl overflow-hidden">
          <img
            src={Background}
            alt="Job search"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-white p-8 flex flex-col justify-center h-full">
            <button
              onClick={handleLogout}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
            <h1 className="text-4xl font-bold mb-4">
              Unlock Your Career Potential
            </h1>
            <p className="max-w-xl text-lg">
              Let our AI-powered resume analyzer match you with your dream job.
              Upload your resume and take the first step towards your ideal
              career.
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="bg-green-50 text-green-700 rounded-xl p-8 text-center space-y-6">
            <CheckCircle size={48} className="mx-auto" />
            <h2 className="text-2xl font-bold">Submission Successful!</h2>
            <p>
              Your resume and job description have been uploaded successfully.
            </p>
            <button
              onClick={resetForm}
              className="mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Another
            </button>
          </div>
        ) : (
          renderForm()
        )}
      </div>
    </div>
  );
};

export default ResumeJobUpload;
