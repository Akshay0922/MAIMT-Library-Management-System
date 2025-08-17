// src/pages/departments/bca/Bca.jsx
import { Navbar } from "../../../components/navbar/Navbar";

import './departments.css';

export const Bca = () => {
  return (
    <>
      <Navbar />
      <div className="dept-page">
        <h1>BCA - Bachelor of Computer Applications</h1>
        <p>
          Welcome to the BCA Department. This program is designed for students who aspire 
          to build a strong foundation in computer applications, programming, and IT systems.
        </p>

        <div className="dept-section">
          <h2>Program Overview</h2>
          <p>
            The BCA program focuses on preparing students for the IT industry by teaching 
            essential skills in software development, database management, networking, and 
            modern web technologies. It provides the perfect stepping stone for those aiming 
            for careers in software engineering, web development, or higher studies in computer science.
          </p>
        </div>

        <div className="dept-section">
          <h2>Course Duration & Structure</h2>
          <p>
            The BCA is a 3-year undergraduate program divided into 6 semesters. Each semester 
            covers core concepts in programming, data structures, operating systems, and practical projects.
          </p>
        </div>

        <div className="dept-section">
          <h2>Eligibility</h2>
          <p>
            Candidates who have completed 10+2 (any stream, with Mathematics/Computer Applications preferred) 
            are eligible to apply.
          </p>
        </div>

        <div className="dept-section">
          <h2>Fees</h2>
          <p>
            The fee structure is designed to be affordable and inclusive. Approximate tuition 
            fees: <strong>₹40,000 – ₹60,000 per year</strong> (may vary as per institution).
          </p>
        </div>

        <div className="dept-section">
          <h2>Benefits of the Program</h2>
          <ul>
            <li>Strong foundation in programming and IT skills.</li>
            <li>Opportunities for internships and live projects.</li>
            <li>High demand in software and IT companies.</li>
            <li>Option to pursue MCA or MBA after graduation for advanced career opportunities.</li>
          </ul>
        </div>

        <div className="dept-section">
          <h2>Career Opportunities</h2>
          <p>
            Graduates can work as Software Developers, Web Developers, System Analysts, IT Support Engineers, 
            Database Administrators, or pursue higher studies like MCA/MSc IT.
          </p>
        </div>
      </div>
    </>
  );
};