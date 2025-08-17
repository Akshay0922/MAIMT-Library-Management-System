import { useNavigate } from 'react-router-dom';

import { AdminSidebar } from '../AdminSidebar';
import AdminAvatar from '../../../../assets/adminAvatar.jpg';

import { AdminLogoutButton } from '../../../../components/adminLogoutButton/AdminLogoutButton';

import './adminProfile.css';

export const AdminProfile = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-profile-main-content shrink">
        <AdminLogoutButton />
        <div className="admin-profile-card">
          <div className="admin-profile-left">
            <h4 className="admin-profile-name">{admin?.adminName || "Admin"}</h4>
            <p className="admin-profile-email">{admin?.adminEmail || "admin@example.com"}</p>

            <div className="admin-profile-btn-group">
                <button
                className="edit-profile-btn"
                onClick={() => navigate('/edit-profile')}
              >
                Edit Profile
              </button>
              <button
                className="change-password-btn"
                onClick={() => navigate('/change-password')}
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="admin-profile-right">
            <div className="admin-profile-img-container">
              <img src={AdminAvatar} alt="Profile" className="admin-profile-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};