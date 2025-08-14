import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import ProfileIcon from '../../assets/adminAvatar.jpg';

import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dropdownRef = useRef();
  const barRef = useRef();

  const handleUserLogin = () => {
    setShowDropdown(false);
    navigate('/student-login');
  };

  const handleAdminLogin = () => {
    setShowDropdown(false);
    navigate('/admin-login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateBarPosition = () => {
    const activeLink = document.querySelector('.main-navbar .nav-link.active');
    const bar = barRef.current;

    if (activeLink && bar) {
      const offsetLeft = activeLink.offsetLeft;
      const width = activeLink.offsetWidth;
      bar.style.transform = `translateX(${offsetLeft}px)`;
      bar.style.width = `${width}px`;
    }
  };

  useLayoutEffect(() => {
    updateBarPosition();
  }, []);

  useEffect(() => {
    updateBarPosition();
  }, [location.pathname]);

  return (
    <div className="main-navbar">
      <div className="main-navbar-container">
        

        <div className={`main-navbar-nav ${isNavOpen ? 'open' : ''}`}>
          <div className="nav-highlight-bar" ref={barRef}></div>
          <NavLink to="/" className="nav-link" onClick={() => setIsNavOpen(false)}>HOME</NavLink>
          <NavLink to="/about" className="nav-link" onClick={() => setIsNavOpen(false)}>ABOUT</NavLink>
          <NavLink to="/rules" className="nav-link" onClick={() => setIsNavOpen(false)}>RULE & REGULATION</NavLink>
          <NavLink to="/books" className="nav-link" onClick={() => setIsNavOpen(false)}>BOOKS</NavLink>
          <NavLink to="/contact-us" className="nav-link" onClick={() => setIsNavOpen(false)}>CONTACT US</NavLink>
        </div>

        <div className="main-navbar-header">
          <button
            className={`hamburger-btn ${isNavOpen ? 'open' : ''}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>

        <div className="main-navbar-profile" ref={dropdownRef}>

          <div className="main-navbar-profile">
            <img
              src={ProfileIcon}
              alt="Profile"
              className="main-navbar-profile-img"
              onClick={() => setShowDropdown(!showDropdown)}
            />
          </div>

          {showDropdown && (
            <div className="main-navbar-dropdown-menu">
              <div className="main-navbar-dropdown-header">Login to your account as</div>
              <button className="main-navbar-login-btn mb-2" onClick={handleUserLogin}>User</button>
              <button className="main-navbar-login-btn" onClick={handleAdminLogin}>Admin</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};