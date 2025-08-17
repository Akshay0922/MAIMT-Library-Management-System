
import { StudentSidebar } from '../../studentSidebarRoutes/StudentSidebar';

import { StudentLogoutButton } from '../../../../components/studentLogoutButton/StudentLogoutButton';

import './studentMyBooks.css';

export const StudentMyBooks = () => {
  return (
    <>
      <div className="admin-dashboard">
        <StudentSidebar />

        <div className="my-books-main-content shrink">
          <StudentLogoutButton />
          <div className="my-books-content-card">
            <h4>🛠️ Welcome to my books!</h4>
            <p className="my-books-text-muted">You're now in the student dashboard.</p>
          </div>
        </div>
      </div >
    </>
  );
};