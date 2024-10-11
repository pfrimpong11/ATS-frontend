import React, { useState } from 'react'
import { CheckCircle, AlertCircle, User, Briefcase, Lightbulb, TrendingUp } from 'lucide-react'

interface JobMatchResponse {
  JDMatch: string
  MissingKeywords: string[]
  ProfileSummary: string
  Advice: string[]
  AlternativeJob: string
}

const dummyData: JobMatchResponse = {
  JDMatch: "75%",
  MissingKeywords: ["Big data technologies (e.g., Hadoop, Spark)", "Familiarity with deep learning frameworks (e.g., TensorFlow, PyTorch)"],
  ProfileSummary: "John Doe is a highly skilled and motivated Computer Engineering student with an interest in Data Science, Machine Learning, Natural Language Processing, Computer Vision, and AI/ML. He has a solid knowledge of programming in Python and JavaScript. Prince has also worked on projects involving Resume Screening, Automated Flashcard Generation, and an Automated Extraction System for Patient Information Leaflets.",
  Advice: [
    "To improve the resume, it is recommended that Prince quantifies his work experience in the IT industry by including specific metrics and results. For example, instead of stating \"Provided technical support for live events and assisted in maintaining security cameras,\" Prince could quantify the number of events supported and the number of cameras maintained.",
    "Prince should also highlight his problem-solving and decision-making skills in his resume. This could be achieved by providing specific examples of projects where he was able to identify problems, develop solutions, and make informed decisions.",
    "Prince should include a section in his resume dedicated to coursework. This section would allow him to highlight his academic achievements, particularly in data science-related courses.",
    "Prince should also consider obtaining a few more industry certifications, such as the AWS Certified Solutions Architect or the Google Cloud Certified Professional Data Engineer. This will further strengthen his resume and make him more competitive in the job market.",
    "Prince should include a GitHub link where potential employers can view his contributions to the ATS tool."
  ],
  AlternativeJob: "Machine Learning Engineer"
}

const JobMatchResult: React.FC = () => {
  const [jobMatchData] = useState<JobMatchResponse | null>(dummyData)

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
    //   maxWidth: '800px',
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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Job Match Analysis</h1>
        <p style={styles.subtitle}>Your path to the perfect career fit</p>
      </header>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <CheckCircle style={styles.icon} size={24} />
          JD Match
        </h2>
        <p style={styles.matchPercentage}>{jobMatchData.JDMatch}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <AlertCircle style={styles.icon} size={24} />
          Missing Keywords
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
        </h2>
        <p>{jobMatchData.ProfileSummary}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Lightbulb style={styles.icon} size={24} />
          Advice for Improvement
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
        </h2>
        <p style={styles.alternativeJob}>
          <TrendingUp style={{ ...styles.icon, verticalAlign: 'middle' }} size={20} />
          {jobMatchData.AlternativeJob}
        </p>
      </div>
    </div>
  )
}

export default JobMatchResult;