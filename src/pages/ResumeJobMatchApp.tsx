import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X, TrendingUp, User, Briefcase, Lightbulb } from 'lucide-react';
import axios from 'axios';
import qs from 'qs';
import { Header } from '@/components/Header';
import { useToast } from "@/hooks/use-toast";

interface JobMatchResponse {
  JDMatch: string;
  MissingKeywords: string[];
  ProfileSummary: string;
  Advice: string[];
  AlternativeJob: string;
}

const ResumeJobMatchApp: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [jobMatchData, setJobMatchData] = useState<JobMatchResponse | null>(null);
  const { toast } = useToast();

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setResume(event.target.files[0]);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been successfully uploaded",
      });
    }
  };

  const handleJobDescriptionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setJobDescriptionFile(event.target.files[0]);
      setJobDescriptionText('');
      toast({
        title: "Job description uploaded",
        description: "Your job description file has been successfully uploaded",
      });
    }
  };

  const handleJobDescriptionTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescriptionText(event.target.value);
    setJobDescriptionFile(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resume || (!jobDescriptionFile && !jobDescriptionText)) {
      setErrorMessage('Please upload a resume and provide a job description.');
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please upload a resume and provide a job description.",
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setJobMatchData(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('resume_file', resume);

      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/upload_resume`,
        uploadFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      const resumeText = uploadResponse.data.resume_text;
      let jobDescriptionContent = '';

      if (jobDescriptionFile) {
        const jobDescriptionFormData = new FormData();
        jobDescriptionFormData.append('resume_file', jobDescriptionFile);

        const jobDescUploadResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/upload_resume`,
          jobDescriptionFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );

        jobDescriptionContent = jobDescUploadResponse.data.resume_text;
      } else {
        jobDescriptionContent = jobDescriptionText;
      }

      const matchPayload = {
        resume_text: resumeText,
        job_description: jobDescriptionContent,
      };

      const matchResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/match_resume`,
        qs.stringify(matchPayload),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      setJobMatchData(matchResponse.data);
      toast({
        title: "Analysis complete",
        description: "Your resume has been successfully analyzed",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred while submitting. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while analyzing your resume. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setResume(null);
    setJobDescriptionFile(null);
    setJobDescriptionText('');
    setErrorMessage('');
    setJobMatchData(null);
    toast({
      title: "Form reset",
      description: "All fields have been cleared",
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary text-center mb-8">
                Job Fit Analysis
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label htmlFor="resume" className="block text-gray-700 font-semibold">
                    Upload Resume
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
                    className="flex items-center justify-center gap-2 px-4 py-4 bg-primary/5 text-primary rounded-xl cursor-pointer hover:bg-primary/10 transition-colors border-2 border-dashed border-primary/20"
                  >
                    <Upload size={20} />
                    {resume ? resume.name : "Select Resume"}
                  </label>
                  {resume && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <FileText size={16} />
                      <span className="truncate">{resume.name}</span>
                      <X
                        size={16}
                        className="text-red-500 cursor-pointer ml-auto"
                        onClick={() => setResume(null)}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-gray-700 font-semibold">Job Description</label>
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
                      className={`flex items-center justify-center gap-2 px-4 py-4 rounded-xl cursor-pointer transition-colors border-2 border-dashed ${
                        jobDescriptionText 
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" 
                          : "bg-primary/5 text-primary border-primary/20 hover:bg-primary/10"
                      }`}
                    >
                      <FileText size={20} />
                      {jobDescriptionFile ? jobDescriptionFile.name : "Upload Job Description"}
                    </label>

                    <textarea
                      placeholder="Or paste job description here..."
                      value={jobDescriptionText}
                      onChange={handleJobDescriptionTextChange}
                      disabled={!!jobDescriptionFile}
                      className={`w-full p-4 border-2 rounded-xl min-h-[120px] resize-vertical ${
                        jobDescriptionFile 
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" 
                          : "border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      }`}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 p-4 rounded-xl">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-primary text-white rounded-xl font-bold transition-all
                    ${isSubmitting 
                      ? "opacity-70 cursor-not-allowed" 
                      : "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    "Match Resume"
                  )}
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 overflow-hidden">
              <div className="h-full overflow-y-auto space-y-6">
                {jobMatchData ? (
                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-xl p-6 text-center">
                      <h2 className="flex justify-center items-center text-xl text-primary mb-4">
                        <CheckCircle className="mr-2" size={24} />
                        Job Description Match
                      </h2>
                      <p className="text-5xl font-bold text-primary">{jobMatchData.JDMatch}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h2 className="flex items-center text-lg text-gray-800 mb-4">
                        <AlertCircle className="mr-2" size={20} />
                        Missing Keywords
                      </h2>
                      {jobMatchData.MissingKeywords.length > 0 ? (
                        <ul className="space-y-2">
                          {jobMatchData.MissingKeywords.map((keyword, index) => (
                            <li key={index} className="flex items-center text-red-600 bg-red-50 p-2 rounded-lg">
                              <X className="mr-2" size={16} />
                              {keyword}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-green-600 bg-green-50 p-3 rounded-lg flex items-center">
                          <CheckCircle className="mr-2" size={16} />
                          No missing keywords found!
                        </p>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h2 className="flex items-center text-lg text-gray-800 mb-4">
                        <User className="mr-2" size={20} />
                        Profile Summary
                      </h2>
                      <p className="text-gray-600 leading-relaxed">{jobMatchData.ProfileSummary}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h2 className="flex items-center text-lg text-gray-800 mb-4">
                        <Lightbulb className="mr-2" size={20} />
                        Improvement Advice
                      </h2>
                      <ul className="space-y-3">
                        {jobMatchData.Advice.map((tip, index) => (
                          <li key={index} className="flex items-start bg-yellow-50 p-3 rounded-lg">
                            <Lightbulb className="mr-2 mt-1 text-yellow-600" size={16} />
                            <span className="text-yellow-800">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h2 className="flex items-center text-lg text-gray-800 mb-4">
                        <Briefcase className="mr-2" size={20} />
                        Alternative Job Suggestion
                      </h2>
                      <p className="flex items-center justify-center text-primary font-bold bg-primary/5 p-4 rounded-lg">
                        <TrendingUp className="mr-2" size={20} />
                        {jobMatchData.AlternativeJob}
                      </p>
                    </div>

                    <div className="text-center pt-4">
                      <button 
                        onClick={resetForm} 
                        className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Analyze Another Resume
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                    <FileText size={48} className="text-gray-300" />
                    <p>Submit your resume to see match results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeJobMatchApp;