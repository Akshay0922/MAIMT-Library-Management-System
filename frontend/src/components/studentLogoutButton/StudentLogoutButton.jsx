import { useNavigate } from 'react-router-dom';

import './studentLogoutButton.css';

export const StudentLogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate('/student-logout');
    };

    return (
        
            <button className="student-logout-top-btn" onClick={handleLogout}>
                Logout
            </button>
      
    );
};