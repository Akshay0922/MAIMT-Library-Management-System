import { Navbar } from "../../../components/navbar/Navbar";

import './departments.css';

export const Mba = () => {
  return (
    <>
      <Navbar />
      <div className="dept-page">
        <h1>MBA - Master of Business Administration</h1>
        <p>
          Welcome to the MBA Department. Here you can explore course details, timetable,
          syllabus, and all resources related to MBA.
        </p>

        <section className="dept-section">
          <h2>About the Program</h2>
          <p>
            The MBA program is designed to prepare students for leadership roles in business
            and management. It focuses on developing analytical, strategic, and leadership
            skills that are vital in today’s competitive world.
          </p>
        </section>

        <section className="dept-section">
          <h2>Program Duration</h2>
          <p>
            The MBA is a <strong>2-year full-time program</strong>, divided into 4 semesters.
          </p>
        </section>

        <section className="dept-section">
          <h2>Specializations Offered</h2>
          <ul>
            <li>Marketing</li>
            <li>Finance</li>
            <li>Human Resource Management (HRM)</li>
            <li>Operations Management</li>
            <li>Information Technology</li>
            <li>International Business</li>
          </ul>
        </section>

        <section className="dept-section">
          <h2>Fee Structure</h2>
          <p>
            The approximate course fee is <strong>₹1.5 – ₹3 lakhs</strong> for the entire
            program (may vary as per institution guidelines).
          </p>
        </section>

        <section className="dept-section">
          <h2>Benefits of MBA</h2>
          <ul>
            <li>Opens doors to leadership and management roles</li>
            <li>Helps in building a strong professional network</li>
            <li>Higher salary potential</li>
            <li>Improves decision-making and analytical skills</li>
            <li>Opportunities to work in diverse industries worldwide</li>
          </ul>
        </section>

        <section className="dept-section">
          <h2>Career Opportunities</h2>
          <p>
            MBA graduates can work as Business Analysts, Marketing Managers, Financial
            Analysts, HR Managers, Consultants, and even start their own ventures.
          </p>
        </section>
      </div>
    </>
  );
};