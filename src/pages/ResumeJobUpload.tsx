import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react'
import Background from '../assets/images/resume-upload.png';

const ResumeJobUpload: React.FC = () => {
    const navigate = useNavigate();
  const [resume, setResume] = useState<File | null>(null)
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null)
  const [jobDescriptionText, setJobDescriptionText] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setResume(event.target.files[0])
    }
  }

  const handleJobDescriptionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setJobDescriptionFile(event.target.files[0])
      setJobDescriptionText('')
    }
  }

  const handleJobDescriptionTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescriptionText(event.target.value)
    setJobDescriptionFile(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (!resume || (!jobDescriptionFile && !jobDescriptionText)) {
      setErrorMessage('Please upload a resume and provide a job description (either as a file or text).')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    const formData = new FormData()
    formData.append('resume', resume)
    
    if (jobDescriptionFile) {
      formData.append('jobDescriptionFile', jobDescriptionFile)
    } else {
      formData.append('jobDescriptionText', jobDescriptionText)
    }

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Submitting:', resume, jobDescriptionFile || jobDescriptionText)
      setIsSuccess(true)
      navigate("/JobMatchResult");
    } catch (error) {
      setErrorMessage('An error occurred while submitting. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setResume(null)
    setJobDescriptionFile(null)
    setJobDescriptionText('')
    setErrorMessage('')
    setIsSuccess(false)
  }

  const styles: { [key: string]: React.CSSProperties } = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem',
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    },
    imageContainer: {
      position: 'relative',
      height: '300px',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    imageText: {
      position: 'relative',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
    },
    imageTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    imageDescription: {
      fontSize: '1.25rem',
      maxWidth: '600px',
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      padding: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#2563eb',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    label: {
      fontWeight: 'bold',
      color: '#4b5563',
      fontSize: '1rem',
    },
    fileInput: {
      display: 'none',
    },
    fileInputLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#e5e7eb',
      color: '#4b5563',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    textarea: {
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical',
    },
    button: {
      padding: '1rem 1.5rem',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    error: {
      color: '#dc2626',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      padding: '0.75rem',
      backgroundColor: '#fee2e2',
      borderRadius: '6px',
    },
    success: {
      color: '#059669',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1rem',
      padding: '1.5rem',
      backgroundColor: '#d1fae5',
      borderRadius: '6px',
      textAlign: 'center',
    },
    fileInfo: {
      fontSize: '0.875rem',
      color: '#4b5563',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    removeFile: {
      cursor: 'pointer',
      color: '#dc2626',
    },
  }

  const renderForm = () => (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Upload Your Application</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="resume" style={styles.label}>
            Upload Resume (PDF, DOC, or TXT)
          </label>
          <input 
            type="file" 
            id="resume" 
            accept=".pdf,.doc,.docx,.txt" 
            onChange={handleResumeChange} 
            style={styles.fileInput}
          />
          <label htmlFor="resume" style={styles.fileInputLabel}>
            <Upload size={20} />
            {resume ? 'Change Resume' : 'Select Resume'}
          </label>
          {resume && (
            <div style={styles.fileInfo}>
              <FileText size={16} />
              <span>{resume.name}</span>
              <X size={16} style={styles.removeFile} onClick={() => setResume(null)} />
            </div>
          )}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Job Description</label>
          
          <div style={styles.inputGroup}>
            <input 
              type="file" 
              id="jobDescriptionFile" 
              accept=".pdf,.doc,.docx,.txt" 
              onChange={handleJobDescriptionFileChange} 
              disabled={!!jobDescriptionText}
              style={styles.fileInput}
            />
            <label htmlFor="jobDescriptionFile" style={{
              ...styles.fileInputLabel,
              opacity: jobDescriptionText ? 0.5 : 1,
              cursor: jobDescriptionText ? 'not-allowed' : 'pointer',
            }}>
              <FileText size={20} />
              {jobDescriptionFile ? 'Change Job Description File' : 'Upload Job Description File'}
            </label>
            {jobDescriptionFile && (
              <div style={styles.fileInfo}>
                <FileText size={16} />
                <span>{jobDescriptionFile.name}</span>
                <X size={16} style={styles.removeFile} onClick={() => setJobDescriptionFile(null)} />
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="jobDescriptionText" style={styles.label}>
              Or Paste Job Description
            </label>
            <textarea
              id="jobDescriptionText"
              placeholder="Paste job description here..."
              value={jobDescriptionText}
              onChange={handleJobDescriptionTextChange}
              disabled={!!jobDescriptionFile}
              style={{
                ...styles.textarea,
                opacity: jobDescriptionFile ? 0.5 : 1,
              }}
            />
          </div>
        </div>

        {errorMessage && (
          <div style={styles.error}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <button 
          type="submit" 
          style={{
            ...styles.button,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  )

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.imageContainer}>
          <img
            src={Background}
            alt="Job search"
            style={styles.backgroundImage}
          />
          <div style={styles.overlay}></div>
          <div style={styles.imageText}>
            <h1 style={styles.imageTitle}>Unlock Your Career Potential</h1>
            <p style={styles.imageDescription}>
              Let our AI-powered resume analyzer match you with your dream job. Upload your resume and take the first step towards your ideal career.
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div style={{...styles.formContainer, ...styles.success}}>
            <CheckCircle size={48} />
            <h2>Submission Successful!</h2>
            <p>Your resume and job description have been uploaded successfully.</p>
            <button onClick={resetForm} style={{...styles.button, backgroundColor: '#059669'}}>
              Submit Another
            </button>
          </div>
        ) : (
          renderForm()
        )}
      </div>
    </div>
  )
}

export default ResumeJobUpload;