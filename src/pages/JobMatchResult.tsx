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

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      color: '#2563eb',
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#64748b',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.5rem',
      color: '#1e40af',
      marginBottom: '1rem',
    },
    icon: {
      marginRight: '0.5rem',
    },
    infoIcon: {
      marginLeft: '0.5rem',
      cursor: 'pointer',
    },
    matchPercentage: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#2563eb',
      textAlign: 'center',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '0.75rem',
    },
    listItemIcon: {
      marginRight: '0.5rem',
      marginTop: '0.25rem',
      flexShrink: 0,
    },
    alternativeJob: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#2563eb',
      textAlign: 'center',
    },
  }

  if (!jobMatchData) {
    return <div style={styles.container}>Loading...</div>
  }

  return (
    <TooltipProvider>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Jobfit Ai Analysis</h1>
          <p style={styles.subtitle}>Your path to the perfect career fit</p>
        </header>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <CheckCircle style={styles.icon} size={24} />
            JD Match
            <Tooltip>
              <TooltipTrigger>
                <Info style={styles.infoIcon} size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>This is how well your resume matches with the job description in percentage.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <p style={styles.matchPercentage}>{jobMatchData.JDMatch}</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <AlertCircle style={styles.icon} size={24} />
            Missing Keywords
            <Tooltip>
              <TooltipTrigger>
                <Info style={styles.infoIcon} size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>These are keywords needed according to the job description but not found in your resume.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <ul style={styles.list}>
            {jobMatchData.MissingKeywords.map((keyword, index) => (
              <li key={index} style={styles.listItem}>
                <AlertCircle style={styles.listItemIcon} size={16} color="#ef4444" />
                {keyword}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <User style={styles.icon} size={24} />
            Profile Summary
            <Tooltip>
              <TooltipTrigger>
                <Info style={styles.infoIcon} size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a summary of your resume.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <p>{jobMatchData.ProfileSummary}</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Lightbulb style={styles.icon} size={24} />
            Advice for Improvement
            <Tooltip>
              <TooltipTrigger>
                <Info style={styles.infoIcon} size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>These are suggestions you can include on your resume to boost your match with the job description.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <ul style={styles.list}>
            {jobMatchData.Advice.map((tip, index) => (
              <li key={index} style={styles.listItem}>
                <Lightbulb style={styles.listItemIcon} size={16} color="#eab308" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Briefcase style={styles.icon} size={24} />
            Alternative Job Suggestion
            <Tooltip>
              <TooltipTrigger>
                <Info style={styles.infoIcon} size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a job suggestion that best fits your resume.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <p style={styles.alternativeJob}>
            <TrendingUp style={{ ...styles.icon, verticalAlign: 'middle' }} size={20} />
            {jobMatchData.AlternativeJob}
          </p>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default JobMatchResult