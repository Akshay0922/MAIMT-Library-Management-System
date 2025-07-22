
import { StudentSidebar } from '../../studentSidebarRoutes/StudentSidebar';

import './studentNotices.css';

export const StudentNotices = () => {
  return (
    <>
      <div className="admin-dashboard">
        <StudentSidebar />

        <div className="notices-main-content shrink">
          <div className="notices-content-card">
            <h4>🛠️ Welcome to notices!</h4>
            <p className="notices-text-muted">You're now in the student dashboard.</p>
          </div>
        </div>
      </div >
    </>
  );
};