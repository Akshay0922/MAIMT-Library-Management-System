import { AdminSidebar } from '../AdminSidebar';

import { AdminLogoutButton } from '../../../../components/adminLogoutButton/AdminLogoutButton';

export const ManageUsers = () => {
  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />

        <div className="admin-main-content shrink">
          <AdminLogoutButton />
          <div className="admin-content-card">
            <h4>🛠️ Manage Users!</h4>
            <p className="admin-text-muted">You're now in the admin dashboard.</p>
          </div>
        </div>
      </div>
    </>
  );
};