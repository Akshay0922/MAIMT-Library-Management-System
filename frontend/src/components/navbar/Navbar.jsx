// import { useState, useEffect, useRef } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// import './navbar.css';
// import ProfileIcon from '../../assets/adminAvatar.jpg';

// export const Navbar = () => {
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef();

//   const handleUserLogin = () => {
//     setShowDropdown(false);
//     navigate('/student-login');
//   };

//   const handleAdminLogin = () => {
//     setShowDropdown(false);
//     navigate('/admin-login');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="main-navbar">
//       <div className="main-navbar-container">
//         <div className="main-navbar-nav">
//           <NavLink to="/" className="nav-link">HOME</NavLink>
//           <NavLink to="/about" className="nav-link">ABOUT</NavLink>
//           <NavLink to="/rules" className="nav-link">RULE & REGULATION</NavLink>
//           <NavLink to="/books" className="nav-link">BOOKS</NavLink>
//           <NavLink to="/contact-us" className="nav-link">CONTACT US</NavLink>
//         </div>

//         <div className="main-navbar-profile" ref={dropdownRef}>
//           <img
//             src={ProfileIcon}
//             alt="Profile"
//             className="main-navbar-profile-img"
//             onClick={() => setShowDropdown(!showDropdown)}
//           />

//           {showDropdown && (
//             <div className="main-navbar-dropdown-menu">
//               <div className="main-navbar-dropdown-header">Login to your account as</div>

//               <button
//                 className="main-navbar-login-btn mb-2"
//                 onClick={handleUserLogin}
//               >
//                 User
//               </button>

//               <button
//                 className="main-navbar-login-btn"
//                 onClick={handleAdminLogin}
//               >
//                 Admin
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import './navbar.css';
import ProfileIcon from '../../assets/adminAvatar.jpg';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
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

  useEffect(() => {
    const activeLink = document.querySelector('.main-navbar .nav-link.active');
    const bar = barRef.current;

    if (activeLink && bar) {
      const offsetLeft = activeLink.offsetLeft;
      const width = activeLink.offsetWidth;

      bar.style.left = `${offsetLeft}px`;
      bar.style.width = `${width}px`;
    }
  }, [location.pathname]);

  return (
    <div className="main-navbar">
      <div className="main-navbar-container">
        <div className="main-navbar-nav">
          <div className="nav-highlight-bar" ref={barRef}></div>

          <NavLink to="/" className="nav-link">HOME</NavLink>
          <NavLink to="/about" className="nav-link">ABOUT</NavLink>
          <NavLink to="/rules" className="nav-link">RULE & REGULATION</NavLink>
          <NavLink to="/books" className="nav-link">BOOKS</NavLink>
          <NavLink to="/contact-us" className="nav-link">CONTACT US</NavLink>
        </div>

        <div className="main-navbar-profile" ref={dropdownRef}>
          <img
            src={ProfileIcon}
            alt="Profile"
            className="main-navbar-profile-img"
            onClick={() => setShowDropdown(!showDropdown)}
          />

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