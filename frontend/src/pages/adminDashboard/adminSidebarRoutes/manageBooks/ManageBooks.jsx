import { useNavigate } from 'react-router-dom';

import { AdminSidebar } from '../AdminSidebar';
import '../../../../components/adminLogoutButton/AdminLogoutButton';

import './manageBooks.css';
import { AdminLogoutButton } from '../../../../components/adminLogoutButton/AdminLogoutButton';

export const ManageBooks = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />

        <div className="admin-manage-books-main-content">
          <AdminLogoutButton />

          <div className="manage-books-buttons-section">
            <button
              className="add-book-btn"
              onClick={() => navigate('/add-new-book')}
            >
              Add New Book
            </button>

            <button
              className="view-book-btn"
              // onClick={() => navigate('/add-new-book')}
            >
              View All Books
            </button>

          </div>
        </div>
      </div>
    </>
  );
};