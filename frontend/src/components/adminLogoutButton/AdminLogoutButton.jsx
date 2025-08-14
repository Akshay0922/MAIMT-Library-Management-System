import { useNavigate } from 'react-router-dom';

import './adminLogoutButton.css';

export const AdminLogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate('/admin-logout');
    };

    return (
        
            <button className="admin-logout-top-btn" onClick={handleLogout}>
                Logout
            </button>
      
    );
};