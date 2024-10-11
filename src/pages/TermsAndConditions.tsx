import React from 'react'
import { Scroll, Shield, User, FileText, Lock, Briefcase, AlertTriangle, Power, Scale, RefreshCw, Mail } from 'lucide-react'

const TermsAndConditions: React.FC = () => {
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
    lastUpdated: {
      fontSize: '1rem',
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
      marginRight: '0.75rem',
    },
    paragraph: {
      marginBottom: '1rem',
      lineHeight: '1.6',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      marginBottom: '1rem',
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
    strong: {
      fontWeight: 'bold',
      color: '#2563eb',
    },
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>JobMatch Terms and Conditions</h1>
        <p style={styles.lastUpdated}><strong>Last updated:</strong> October 9, 2024</p>
      </header>

      <div style={styles.section}>
        <p style={styles.paragraph}>
          Welcome to <strong style={styles.strong}>JobMatch</strong>! These terms and conditions outline the rules and regulations for the use of JobMatch's services, provided by <strong style={styles.strong}>JobMatch Inc.</strong> ("we", "us", "our").
        </p>
        <p style={styles.paragraph}>
          By registering or using our services, you agree to these terms and conditions. Please read them carefully.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Scroll style={styles.icon} size={24} />
          1. Acceptance of Terms
        </h2>
        <p style={styles.paragraph}>
          By accessing or using the JobMatch app, you agree to be bound by these Terms and Conditions, including our Privacy Policy. If you do not agree with any part of the Terms, you may not use our services.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Briefcase style={styles.icon} size={24} />
          2. Description of Services
        </h2>
        <p style={styles.paragraph}>
          JobMatch provides an online platform where users can upload their resumes and job descriptions to receive automated analysis, job suggestions, and resume improvement recommendations. The services we provide are intended to enhance the job application process but do not guarantee employment or specific outcomes.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <User style={styles.icon} size={24} />
          3. User Responsibilities
        </h2>
        <p style={styles.paragraph}>
          You are responsible for ensuring that the information you provide (e.g., resumes, personal details) is accurate, up to date, and lawful. You must not:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <AlertTriangle style={styles.listItemIcon} size={16} color="#eab308" />
            Provide false or misleading information.
          </li>
          <li style={styles.listItem}>
            <AlertTriangle style={styles.listItemIcon} size={16} color="#eab308" />
            Use the app for illegal purposes.
          </li>
          <li style={styles.listItem}>
            <AlertTriangle style={styles.listItemIcon} size={16} color="#eab308" />
            Upload any harmful or malicious content, such as viruses or malware.
          </li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Lock style={styles.icon} size={24} />
          4. Privacy and Data Protection
        </h2>
        <p style={styles.paragraph}>
          By using JobMatch, you consent to the collection, use, and sharing of your data as outlined in our <strong style={styles.strong}>Privacy Policy</strong>. We take your privacy seriously and use your data to provide you with the best possible experience while ensuring it is handled securely.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Shield style={styles.icon} size={24} />
          5. Intellectual Property
        </h2>
        <p style={styles.paragraph}>
          All content, design, and intellectual property associated with JobMatch, including logos, branding, and software, are owned by us. You may not copy, distribute, modify, or use our intellectual property without prior written permission.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <User style={styles.icon} size={24} />
          6. User Accounts
        </h2>
        <p style={styles.paragraph}>
          To access certain features of JobMatch, you must register an account. You are responsible for keeping your account details secure. Do not share your login credentials with others. We reserve the right to suspend or terminate accounts that violate these terms.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <AlertTriangle style={styles.icon} size={24} />
          7. Prohibited Activities
        </h2>
        <p style={styles.paragraph}>
          You agree not to:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <AlertTriangle style={styles.listItemIcon} size={16} color="#ef4444" />
            Upload content that infringes on intellectual property rights or violates any law.
          </li>
          <li style={styles.listItem}>
            <AlertTriangle style={styles.listItemIcon} size={16} color="#ef4444" />
            Use JobMatch to send spam, phishing, or other unsolicited messages.
          </li>
          <li style={styles.listItem}>
            <AlertTriangle style={styles.listItemIcon} size={16} color="#ef4444" />
            Reverse engineer or interfere with the functioning of the app.
          </li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Power style={styles.icon} size={24} />
          8. Termination of Use
        </h2>
        <p style={styles.paragraph}>
          We may suspend or terminate your access to JobMatch at any time if you violate these terms or engage in behavior that harms our services or other users. You may also terminate your account at any time by contacting us.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Scale style={styles.icon} size={24} />
          9. Limitation of Liability
        </h2>
        <p style={styles.paragraph}>
          While we strive to provide accurate and reliable services, JobMatch does not guarantee that the services will be error-free or uninterrupted. We are not responsible for any damages, loss of data, or loss of opportunity arising from the use or inability to use our services.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <RefreshCw style={styles.icon} size={24} />
          10. Modifications to the Terms
        </h2>
        <p style={styles.paragraph}>
          We may update these terms from time to time. You are encouraged to review the Terms and Conditions periodically. Your continued use of the app after changes have been made constitutes your acceptance of the updated terms.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Mail style={styles.icon} size={24} />
          11. Contact Us
        </h2>
        <p style={styles.paragraph}>
          If you have any questions or concerns about these Terms and Conditions, feel free to contact us .
        </p>
      </div>
    </div>
  )
}

export default TermsAndConditions;