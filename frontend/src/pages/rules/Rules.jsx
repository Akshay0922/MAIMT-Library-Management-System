import { Navbar } from '../../components/navbar/Navbar';

import { FaBookDead, FaBan, FaBellSlash, FaMobileAlt, FaUserClock, FaIdBadge, FaChair, FaClock } from "react-icons/fa";

import RulesPageImage from '../../assets/rulesPageImage.png';
import Ball from "../../assets/ball.png";

import "./rules.css";

export const Rules = () => {
  const rules = [
    {
      icon: <FaUserClock />,
      text: "A fine of ₹5 per book per day will be charged for late returns.",
    },
    {
      icon: <FaBan />,
      text: "Bags and personal belongings are not allowed inside the library.",
    },
    {
      icon: <FaBellSlash />,
      text: "Maintain silence at all times in the library.",
    },
    {
      icon: <FaMobileAlt />,
      text: "Use of mobile phones is strictly prohibited.",
    },
    {
      icon: <FaIdBadge />,
      text: "Students must carry their ID cards for issuing books.",
    },
    {
      icon: <FaBookDead />,
      text: "Damaged or lost books must be replaced or paid for.",
    },
    {
      icon: <FaChair />,
      text: "Seats are available on a first-come, first-served basis. No reservations.",
    },
    {
      icon: <FaClock />,
      text: "Return issued books within time to avoid penalties.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="rules-page-top-part">
        <img className="home-ball" src={Ball} alt="Ball" />
        <div className="top-content">
          <div className="rules-text-block">
            <h1>Know the</h1>
            <h2>Library Rules & Regulations</h2>
            <p>Ensure a smooth experience by following our library guidelines.</p>
          </div>

          <div className="image-block">
            <img src={RulesPageImage} alt='rules image' className='rules-page-image' />
          </div>
        </div>
      </div>

      <div className="rules-page">
        <h1 className="rules-title">Rules & Regulations</h1>
        

        <div className="rules-list">
          {rules.map((rule, index) => (
            <div className="rule-item" key={index}>
              <span className="rule-icon">{rule.icon}</span>
              <span className="rule-text">{rule.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};