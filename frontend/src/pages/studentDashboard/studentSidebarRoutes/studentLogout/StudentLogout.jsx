import { useNavigate } from 'react-router-dom';
import { StudentSidebar } from '../StudentSidebar';
import { FaSignOutAlt } from 'react-icons/fa';

import './studentLogout.css';

export const StudentLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <StudentSidebar />

      <div className="student-logout-main-content shrink">
        <div className="student-logout-content-card">
          <h4>CONFIRM LOGOUT</h4>
          <p className="student-logout-text-muted">Are you sure you want to log out from your student session?</p>
          <FaSignOutAlt className='student-logout-icon' /> <br />
          <button className="student-logout-btn" onClick={handleLogout}>
            Yes, Log Me Out
          </button>
        </div>
      </div>
    </div>
  );
};