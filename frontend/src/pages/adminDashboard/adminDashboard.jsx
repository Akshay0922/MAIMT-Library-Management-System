import { useEffect, useState } from 'react';

import { AdminSidebar } from './adminSidebarRoutes/AdminSidebar';

import './adminDashboard.css';

export const AdminDashboard = () => {

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("showWelcome");
    if (justLoggedIn === "true") {
      setShowWelcome(true);
      sessionStorage.removeItem("showWelcome");
    }
  }, []);


  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />

        <div className="admin-main-content shrink">
          <div className="admin-content-card">
            <h4>🛠️ Welcome to Admin Dashboard!</h4>
            <p className="admin-text-muted">You're now in the admin dashboard.</p>
          </div>
        </div>
      </div >

      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-popup">
            <h2>👋 Welcome to Admin Panel</h2>
            <p>
              You now have full control to manage books, users, and monitor library activity.
              Use the sidebar to navigate between sections.
            </p>
            <button className="thanks-btn" onClick={() => setShowWelcome(false)}>
              Thank You
            </button>
          </div>
        </div>
      )
      }
    </>
  );
};