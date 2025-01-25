'use client'

import React from 'react'
import { useLocation } from 'react-router-dom'
import { CheckCircle, AlertCircle, User, Briefcase, Lightbulb, TrendingUp, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface JobMatchResponse {
  JDMatch: string
  MissingKeywords: string[]
  ProfileSummary: string
  Advice: string[]
  AlternativeJob: string
}

const JobMatchResult: React.FC = () => {
  const location = useLocation()
  const jobMatchData = location.state?.jobMatchData as JobMatchResponse | null

  if (!jobMatchData) {
    return <div className="container mx-auto p-8">Loading...</div>
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-8 bg-slate-50 rounded-2xl shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Jobfit Ai Analysis</h1>
          <p className="text-xl text-slate-600">Your path to the perfect career fit</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="flex items-center text-2xl text-blue-800 mb-4">
            <CheckCircle className="mr-2" size={24} />
            JD Match
            <Tooltip>
              <TooltipTrigger>
                <Info className="ml-2 cursor-pointer" size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>This is how well your resume matches with the job description in percentage.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <p className="text-5xl font-bold text-blue-600 text-center">{jobMatchData.JDMatch}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="flex items-center text-2xl text-blue-800 mb-4">
            <AlertCircle className="mr-2" size={24} />
            Missing Keywords
            <Tooltip>
              <TooltipTrigger>
                <Info className="ml-2 cursor-pointer" size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>These are keywords needed according to the job description but not found in your resume.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <ul>
            {jobMatchData.MissingKeywords.map((keyword, index) => (
              <li key={index} className="flex items-start mb-2">
                <AlertCircle className="mr-2 mt-1 flex-shrink-0 text-red-500" size={16} />
                <span>{keyword}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="flex items-center text-2xl text-blue-800 mb-4">
            <User className="mr-2" size={24} />
            Profile Summary
            <Tooltip>
              <TooltipTrigger>
                <Info className="ml-2 cursor-pointer" size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a summary of your resume.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <p>{jobMatchData.ProfileSummary}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="flex items-center text-2xl text-blue-800 mb-4">
            <Lightbulb className="mr-2" size={24} />
            Advice for Improvement
            <Tooltip>
              <TooltipTrigger>
                <Info className="ml-2 cursor-pointer" size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>These are suggestions you can include on your resume to boost your match with the job description.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <ul>
            {jobMatchData.Advice.map((tip, index) => (
              <li key={index} className="flex items-start mb-2">
                <Lightbulb className="mr-2 mt-1 flex-shrink-0 text-yellow-500" size={16} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="flex items-center text-2xl text-blue-800 mb-4">
            <Briefcase className="mr-2" size={24} />
            Alternative Job Suggestion
            <Tooltip>
              <TooltipTrigger>
                <Info className="ml-2 cursor-pointer" size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a job suggestion that best fits your resume.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <p className="text-xl font-bold text-blue-600 text-center flex items-center justify-center">
            <TrendingUp className="mr-2" size={20} />
            {jobMatchData.AlternativeJob}
          </p>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default JobMatchResult