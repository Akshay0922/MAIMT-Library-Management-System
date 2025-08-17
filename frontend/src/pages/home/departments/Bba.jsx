import { Navbar } from "../../../components/navbar/Navbar";

import './departments.css';

export const Bba = () => {
  return (
    <>
      <Navbar />
      <div className="dept-page">
        <h1>BBA - Bachelor of Business Administration</h1>
        <p>
          Welcome to the BBA Department!  
          The BBA program focuses on management, business fundamentals, and entrepreneurship.  
          It prepares students with the right balance of theory and practical exposure to the corporate world.  
        </p>

        <section className="dept-section">
          <h2>Course Duration</h2>
          <p>3 Years (6 Semesters)</p>
        </section>

        <section className="dept-section">
          <h2>Eligibility</h2>
          <p>10+2 in any stream (with minimum 45% marks).</p>
        </section>

        <section className="dept-section">
          <h2>Fees Structure</h2>
          <p>Approx. ₹35,000 – ₹50,000 per year (varies by institution).</p>
        </section>

        <section className="dept-section">
          <h2>Key Benefits</h2>
          <ul>
            <li>Strong foundation in business and management concepts.</li>
            <li>Exposure to corporate culture and practices.</li>
            <li>Skill development in leadership, communication, and decision-making.</li>
            <li>Gateway to MBA and other higher studies.</li>
          </ul>
        </section>

        <section className="dept-section">
          <h2>Career Opportunities</h2>
          <ul>
            <li>Management Trainee</li>
            <li>Business Development Executive</li>
            <li>Marketing Manager</li>
            <li>Financial Analyst</li>
            <li>Entrepreneur / Startup Founder</li>
          </ul>
        </section>

        <section className="dept-section">
          <h2>Why Choose BBA?</h2>
          <p>
            BBA equips students with essential business skills, industry exposure,  
            and leadership qualities to excel in corporate and entrepreneurial roles.  
            It acts as a stepping stone to a rewarding career in management.
          </p>
        </section>
      </div>
    </>
  );
};