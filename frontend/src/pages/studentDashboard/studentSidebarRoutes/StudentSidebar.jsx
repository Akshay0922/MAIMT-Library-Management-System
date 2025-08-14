import { useNavigate, useLocation } from 'react-router-dom';
import {
    FaSignOutAlt, FaHome, FaUser, FaBookReader, FaBell
} from 'react-icons/fa';

import AdminAvatar from '../../../assets/adminAvatar.jpg';

import './studentSidebar.css';

export const StudentSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleNavigation = (path) => navigate(path);

    const menuItems = [
        { path: '/student-dashboard', icon: <FaHome className="icon-md" />, label: 'Dashboard' },
        { path: '/student-profile', icon: <FaUser className="icon-md" />, label: 'My Profile' },
        { path: '/student-books', icon: <FaBookReader className="icon-md" />, label: 'My Books' },
        { path: '/student-notices', icon: <FaBell className="icon-md" />, label: 'Notices' },
        { path: '/student-logout', icon: <FaSignOutAlt className="icon-md" />, label: 'Logout' },
    ];

    return (
        <div className="student-sidebar open">
            <div className="student-profile-section">
                <div className='student-avatar-container'>
                    <img
                        src={AdminAvatar}
                        alt="Admin Avatar"
                        className="student-avatar"
                    />
                </div>
                <h6 className="student-name">Hi, {user?.userName || "Admin"}</h6>
                <hr className="divider" />
            </div>

            <div className="student-sidebar-header">
                <h5>Student Panel</h5>
            </div>

            <ul className="student-sidebar-menu">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        className={
                            (item.path === '/student-profile' &&
                                location.pathname.match(/^\/(student-profile|new-admin-login)/)) ||
                                location.pathname === item.path
                                ? 'active'
                                : ''
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
