import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../AdminSidebar';
import { FaSignOutAlt } from 'react-icons/fa';

import './adminLogout.css';

export const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-logout-main-content shrink">
        <div className="admin-logout-content-card">
          <h4>CONFIRM LOGOUT</h4>
          <p className="admin-logout-text-muted">Are you sure you want to log out from your admin session?</p>
          <FaSignOutAlt className='admin-logout-icon' /> <br />
          <button className="admin-logout-btn" onClick={handleLogout}>
            Yes, Log Me Out
          </button>
        </div>
      </div>
    </div>
  );
};