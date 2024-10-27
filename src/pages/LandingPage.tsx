import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, BarChart } from 'lucide-react'

const LandingPage: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    const handleButton = () => {
        navigate("/RegisterPage");
    };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '2rem 0',
    },
    logo: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#2563eb',
    },
    button: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    heroSection: {
      textAlign: 'center',
      marginBottom: '4rem',
    },
    heroTitle: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    heroDescription: {
      fontSize: '1.25rem',
      color: '#4b5563',
      marginBottom: '2rem',
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '3rem',
      marginBottom: '4rem',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '1rem',
    },
    icon: {
      color: '#2563eb',
      marginRight: '0.5rem',
      flexShrink: 0,
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    cardList: {
      listStyle: 'disc',
      paddingLeft: '1.5rem',
      color: '#4b5563',
    },
    footer: {
      backgroundColor: '#f3f4f6',
      padding: '2rem 0',
      marginTop: '4rem',
      textAlign: 'center',
      color: '#4b5563',
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #eff6ff, white)', color: '#1f2937' }}>
      <header style={styles.container}>
        <nav style={styles.header}>
          <h1 style={styles.logo}>Jobfit Ai</h1>
          <button onClick={handleButton} style={styles.button}>Get Started</button>
        </nav>
      </header>

      <main style={styles.container}>
        <section style={styles.heroSection}>
          <h2 style={styles.heroTitle}>Your Ultimate ATS Resume Evaluator</h2>
          <p style={styles.heroDescription}>
            Unlock your potential and stand out in today's competitive job market with Jobfit Ai!
          </p>
          <button onClick={handleButton} style={{ ...styles.button, fontSize: '1.125rem', padding: '0.75rem 2rem' }}>Start Now</button>
        </section>

        <section style={styles.mainContent}>
          <div>
            <h3 style={styles.sectionTitle}>How It Works</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Upload style={styles.icon} />
                <span>Upload your resume in PDF or TXT format.</span>
              </li>
              <li style={styles.listItem}>
                <FileText style={styles.icon} />
                <span>Enter the job description of the role you're interested in.</span>
              </li>
              <li style={styles.listItem}>
                <CheckCircle style={styles.icon} />
                <span>Receive a detailed analysis of how well your resume aligns with the job requirements.</span>
              </li>
              <li style={styles.listItem}>
                <BarChart style={styles.icon} />
                <span>Discover areas for improvement with our AI-driven insights.</span>
              </li>
            </ul>
          </div>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Why Jobfit Ai?</h3>
            <p style={{ marginBottom: '1rem' }}>
              Jobfit Ai revolutionizes the way you prepare your resume. We know that job hunting can be stressful, and
              Applicant Tracking Systems (ATS) can often be a hurdle. That's why we've built a smart tool to ensure your
              resume isn't just a good fit for you, but also for the job you're applying for.
            </p>
            <ul style={styles.cardList}>
              <li>Tailored Resume Suggestions</li>
              <li>Detailed Skills & Experience Analysis</li>
              <li>Increase Your ATS Success Rate</li>
            </ul>
          </div>
        </section>

        <section style={{ textAlign: 'center' }}>
          <h3 style={{ ...styles.sectionTitle, fontSize: '1.875rem' }}>Stand Out from the Crowd</h3>
          <p style={{ ...styles.heroDescription, marginBottom: '2rem' }}>
            Our system simulates how top ATS systems review your resume, helping you beat the algorithms and increase
            your chances of getting noticed by hiring managers.
          </p>
          <button onClick={handleButton} style={{ ...styles.button, fontSize: '1.125rem', padding: '0.75rem 2rem' }}>Get Started Now</button>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>&copy; {currentYear} Jobfit Ai. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default LandingPage