import MaimtImage from "../../assets/maimtImage.png";
import { Navbar } from '../../components/navbar/Navbar';
import AboutUsImage from '../../assets/aboutUsImage.png';
import Ball from "../../assets/ball.png";

import "./about.css";

export const About = () => {
  return (
    <>
      <Navbar />

      <div className="about-page-top-part">
        <img className="home-ball" src={Ball} alt="Ball" />

        <div className="top-content">
          <div className="about-text-block">
            <h1>About</h1>
            <h2>MAIMT Library</h2>
            <p>
              Empowering knowledge seekers with rich resources, a peaceful environment, 
              and modern facilities.
            </p>
          </div>

          <div className="image-block">
            <img src={AboutUsImage} alt="About Us" className="about-us-image" />
          </div>
        </div>
      </div>

      <div className="about-main-wrapper">
        <section className="maimt-section">
          <h1 className="section-title">MAIMT</h1>
          <div className="maimt-layout">
            <div className="maimt-left">
              <p><strong>Full Form:</strong> Maharaja Agrasen Institute of Management and Technology</p>
              <p><strong>🎯 Mission:</strong> To deliver quality education & shape future leaders with strong ethics and values.</p>
              <p><strong>📚 Total Students:</strong> 1200+</p>
              <p><strong>👨‍🏫 Total Teachers:</strong> 50+</p>
              <p><strong>🏛️ Established Year:</strong> 1997</p>
              <p><strong>📐 Campus Area:</strong> 10+ Acres green, Wi-Fi-enabled campus</p>
              <p><strong>📋 Affiliation:</strong> Affiliated to Kurukshetra University & Approved by AICTE</p>
              <p><strong>💼 Placement Highlights:</strong> 90%+ placement record with top recruiters</p>
              <a href="https://maimt.com" target="_blank" rel="noreferrer" className="visit-btn">
                Visit Official Website
              </a>
            </div>
            <div className="maimt-right">
              <img src={MaimtImage} alt="MAIMT College" className="maimt-img" />
            </div>
          </div>
        </section>

        <section className="library-section">
          <h1 className="section-title">MAIMT Library</h1>
          <div className="library-content">
            <p><strong>📖 Total Books:</strong> 25,000+ including textbooks, reference materials & general reading</p>
            <p><strong>🗂️ Journals:</strong> National & International journals in digital and printed formats</p>
            <p><strong>💻 Digital Resources:</strong> NDL, DELNET, e-ShodhSindhu, and online e-books access</p>
            <p><strong>🕒 Timings:</strong> 9:00 AM – 5:00 PM (Monday to Saturday)</p>
            <p><strong>👥 Seating Capacity:</strong> 100+ readers in a quiet, air-conditioned reading environment</p>
            <p><strong>👨‍💼 Library Staff:</strong> Experienced librarians and assistants for academic support</p>
            <p><strong>📑 Services Offered:</strong> Book lending, reference services, reprography, internet access</p>
            <p><strong>📶 Wi-Fi Facility:</strong> High-speed internet for accessing digital repositories</p>
            <p className="library-desc">
              The MAIMT Library aims to promote lifelong learning by providing access to world-class academic resources.
              With a student-friendly environment, digital infrastructure, and dedicated staff, the library plays a vital role in supporting academic excellence.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};