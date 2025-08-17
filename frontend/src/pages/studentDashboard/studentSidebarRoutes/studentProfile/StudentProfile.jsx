import { useNavigate } from 'react-router-dom';

import { StudentSidebar } from '../StudentSidebar';
import AdminAvatar from '../../../../assets/adminAvatar.jpg';

import { StudentLogoutButton } from '../../../../components/studentLogoutButton/StudentLogoutButton';

import './StudentProfile.css';

export const StudentProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="admin-dashboard">
      <StudentSidebar />

      <div className="student-profile-main-content shrink">
        <StudentLogoutButton />
        <div className="student-profile-card">
          <div className="student-profile-left">
            <div className="student-detail-group">
              <p><strong>Username:</strong> {user?.userName || 'N/A'}</p>
              <p><strong>Father Name:</strong> {user?.fatherName || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>Address:</strong> {user?.address || 'N/A'}</p>
              <p><strong>Batch:</strong> {user?.batch || 'N/A'}</p>
              <p><strong>Course:</strong> {user?.course || 'N/A'}</p>
              <p><strong>Semester:</strong> {user?.semester || 'N/A'}</p>
              <p><strong>Roll Number:</strong> {user?.rollNumber || 'N/A'}</p>
              <p><strong>Phone Number:</strong> {user?.number || 'N/A'}</p>
            </div>

            <div className="student-profile-btn-group">
              <button
                className="student-edit-profile-btn"
                onClick={() => navigate('/edit-profile')}
              >
                Edit Profile
              </button>
              <button
                className="student-change-password-btn"
                onClick={() => navigate('/change-password')}
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="student-profile-right">
            <div className="student-profile-img-container">
              <img src={AdminAvatar} alt="Profile" className="student-profile-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};