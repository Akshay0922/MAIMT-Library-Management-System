import { useNavigate, useLocation } from 'react-router-dom';
import {
    FaUserPlus, FaBook, FaChartBar,
    FaUserCog, FaSignOutAlt, FaHome, FaUserCircle
} from 'react-icons/fa';

import AdminAvatar from '../../../assets/adminAvatar.jpg';

import './adminSidebar.css';

export const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const admin = JSON.parse(localStorage.getItem("admin"));

    const handleNavigation = (path) => navigate(path);

    const menuItems = [
        { path: '/admin-dashboard', icon: <FaHome className="icon-md" />, label: 'Dashboard' },
        { path: '/admin-profile', icon: <FaUserCircle className="icon-md" />, label: 'My Profile' },
        { path: '/new-admin', icon: <FaUserPlus className="icon-md" />, label: 'New Admin' },
        { path: '/manage-users', icon: <FaUserCog className="icon-md" />, label: 'Manage Users' },
        { path: '/manage-books', icon: <FaBook className="icon-md" />, label: 'Manage Books' },
        { path: '/reports', icon: <FaChartBar className="icon-md" />, label: 'Reports' },
        { path: '/admin-logout', icon: <FaSignOutAlt className="icon-md" />, label: 'Logout' },
    ];

    return (
        <div className="admin-sidebar open">
            <div className="admin-profile-section">
                <div className='admin-avatar-container'>
                    <img
                        src={AdminAvatar}
                        alt="Admin Avatar"
                        className="admin-avatar"
                    />
                </div>
                <h6 className="admin-name">Hi, {admin?.adminName || "Admin"}</h6>
                <hr className="divider" />
            </div>

            <div className="admin-sidebar-header">
                <h5>Admin Panel</h5>
            </div>

            <ul className="admin-sidebar-menu">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        className={
                            (item.path === '/new-admin' &&
                                location.pathname.match(/^\/(new-admin|new-admin-login)/)) ||
                                (item.path === '/manage-books' &&
                                    location.pathname.match(/^\/(manage-books|add-new-book|issue-book)/)) ||
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
