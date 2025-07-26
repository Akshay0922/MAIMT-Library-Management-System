import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import maimtLogo from '../../assets/maimtLogo.png';
import './Header.css';

export const Header = () => {
  return (
    <section className="header">

      <img className="maimtLogo" src={maimtLogo} alt="Maimt Logo" />
      <h1 className='heading-line'>MAIMT</h1>
      <span className='heading-line-fullform'>Maharaja Agrasen Institute of <br />Management and Technology</span>

      <div className="contact-info">
        <div className="info-item">
          <a href="tel:8222948280">
            <FaPhoneAlt className="icon" />
          </a>
          <span>8222948280</span>
        </div>
        <div className="info-item">
          <a href="mailto:director@maimt.com">
            <FaEnvelope className="icon" />
          </a>
          <span>director@maimt.com</span>
        </div>
      </div>

      <div className="bookmark-ribbon">
        <span className="bookmark-text">
          Follow Us :
          <a href="https://instagram.com/maimt_official" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com/maimtdetail" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.linkedin.com/school/maimtdetail" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
      </div>

    </section>
  );
};