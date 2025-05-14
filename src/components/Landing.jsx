// components/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome to Our Emergency Details Application</h1>
        <p style={styles.subtitle}>Your health and safety are just a click away.</p>
      </div>
      
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Quick Access to Emergency Details</h3>
          <p style={styles.featureText}>Create and store your emergency medical details, and access them through a QR code when you need it most.</p>
        </div>
        
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Easy and Secure Login</h3>
          <p style={styles.featureText}>Sign up or log in to update your personal information securely. All details are saved locally for privacy.</p>
        </div>
        
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>User-Friendly Interface</h3>
          <p style={styles.featureText}>Our easy-to-use interface ensures that updating and accessing your emergency details is fast and simple.</p>
        </div>
      </div>

      <div style={styles.actions}>
        <Link to="/login" style={styles.button}>
          <button style={styles.loginButton}>Login</button>
        </Link>
        <Link to="/signup" style={styles.button}>
          <button style={styles.signupButton}>Signup</button>
        </Link>
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>Your safety is our priority. Always be prepared.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    padding: '40px 20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    color: '#343a40',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6c757d',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '40px',
  },
  feature: {
    maxWidth: '300px',
    padding: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    margin: '10px',
  },
  featureTitle: {
    fontSize: '20px',
    color: '#007bff',
    marginBottom: '10px',
  },
  featureText: {
    fontSize: '14px',
    color: '#495057',
  },
  actions: {
    marginBottom: '20px',
  },
  button: {
    margin: '10px',
  },
  loginButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  signupButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  footer: {
    marginTop: '40px',
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '5px',
  },
  footerText: {
    fontSize: '12px',
  },
};

export default Landing;
