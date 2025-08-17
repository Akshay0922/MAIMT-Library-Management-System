import { Navbar } from "../../../components/navbar/Navbar";
import "./departments.css";

export const Mca = () => {
  return (
    <>
      <Navbar />
      <div className="dept-page">
        <header className="dept-header">
          <h1>MCA - Master of Computer Applications</h1>
          <p>
            The MCA program at MAIMT is designed to equip students with advanced
            knowledge in computer science, software development, and IT
            management, preparing them for the ever-evolving digital world.
          </p>
        </header>

        {/* Overview */}
        <section className="dept-section">
          <h2>Program Overview</h2>
          <p>
            MCA is a 2-year postgraduate program focusing on computer
            applications, programming languages, system design, and database
            management. It bridges the gap between theory and practical
            application through projects, internships, and industry exposure.
          </p>
        </section>

        {/* Eligibility */}
        <section className="dept-section">
          <h2>Eligibility Criteria</h2>
          <ul>
            <li>Bachelor’s degree in Computer Science / BCA or equivalent.</li>
            <li>Minimum 50% aggregate marks (relaxation for reserved categories).</li>
            <li>Strong foundation in mathematics and programming preferred.</li>
          </ul>
        </section>

        {/* Fee Structure */}
        <section className="dept-section">
          <h2>Fee Structure</h2>
          <p>
            The MCA program fee is <strong>₹60,000 per year</strong>, covering
            tuition, library access, lab facilities, and university charges.
            Scholarships are available for meritorious and deserving students.
          </p>
        </section>

        {/* Benefits */}
        <section className="dept-section benefits">
          <h2>Why Choose MCA at MAIMT?</h2>
          <div className="benefit-cards">
            <div className="benefit-card">
              <h3>💻 Industry-Oriented Curriculum</h3>
              <p>
                Courses aligned with current IT trends like AI, Cloud Computing,
                and Data Science.
              </p>
            </div>
            <div className="benefit-card">
              <h3>🎓 Expert Faculty</h3>
              <p>Learn from experienced professors and industry professionals.</p>
            </div>
            <div className="benefit-card">
              <h3>📚 State-of-the-Art Labs</h3>
              <p>
                Hands-on training with modern labs, tools, and software
                resources.
              </p>
            </div>
            <div className="benefit-card">
              <h3>💼 Career Opportunities</h3>
              <p>
                Placement support in top IT companies with competitive salary
                packages.
              </p>
            </div>
          </div>
        </section>

        {/* Career Scope */}
        <section className="dept-section">
          <h2>Career Scope</h2>
          <p>After completing MCA, students can work in roles like:</p>
          <ul>
            <li>Software Developer / Engineer</li>
            <li>Data Scientist / Analyst</li>
            <li>Cloud Engineer / DevOps Specialist</li>
            <li>IT Consultant / Project Manager</li>
            <li>Cybersecurity Expert</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="dept-cta">
          <h2>Ready to Build Your Future in Technology?</h2>
          <p>
            Apply today and start your journey with MAIMT’s MCA program to
            become a future IT leader.
          </p>
          <button className="apply-btn">Apply Now</button>
        </section>
      </div>
    </>
  );
};