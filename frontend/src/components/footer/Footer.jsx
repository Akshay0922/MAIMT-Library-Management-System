import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Library Management System</h2>
          <p>Maharaja Agrasen Institute of Management & Technology</p>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/rules">Rules & Regulations</a></li>
            <li><a href="/books">Books</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="footer-contact-item">
            <FaPhoneAlt className="footer-icon" />
            <a href="tel:8222948280">8222948280</a>
          </div>
          <div className="footer-contact-item">
            <FaEnvelope className="footer-icon" />
            <a href="mailto:director@maimt.com">director@maimt.com</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MAIMT. All rights reserved.</p>
      </div>
    </footer>
  );
};