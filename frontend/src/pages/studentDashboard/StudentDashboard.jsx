// import { useEffect, useState } from 'react';

// import { StudentSidebar } from './studentSidebarRoutes/StudentSidebar';

// import './studentDashboard.css';

// export const StudentDashboard = () => {

//   const [showWelcome, setShowWelcome] = useState(false);

//   useEffect(() => {
//     const justLoggedIn = sessionStorage.getItem("showWelcome");
//     if (justLoggedIn === "true") {
//       setShowWelcome(true);
//       sessionStorage.removeItem("showWelcome");
//     }
//   }, []);


//   return (
//     <>
//       <div className="admin-dashboard">
//         <StudentSidebar />

//         <div className="admin-main-content shrink">
//           <div className="admin-content-card">
//             <h4>🛠️ Welcome to Student Dashboard!</h4>
//             <p className="admin-text-muted">You're now in the student dashboard.</p>
//           </div>
//         </div>
//       </div >

//       {showWelcome && (
//         <div className="welcome-overlay">
//           <div className="welcome-popup">
//             <h2>👋 Welcome to Student Panel</h2>
//             <p>
//               You can now view your dashboard, issue books, and more.
//               Use the sidebar to navigate between sections.
//             </p>
//             <button className="thanks-btn" onClick={() => setShowWelcome(false)}>
//               Thank You
//             </button>
//           </div>
//         </div>
//       )
//       }
//     </>
//   );
// };




import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { StudentSidebar } from './studentSidebarRoutes/StudentSidebar';

import { StudentLogoutButton } from '../../components/studentLogoutButton/StudentLogoutButton';

// import './studentDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export const StudentDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem('showWelcome');
    if (justLoggedIn === 'true') {
      setShowWelcome(true);
      sessionStorage.removeItem('showWelcome');
    }
  }, []);

  const cardData = [
    { title: 'Books Issued', value: 5, color: '#0077b6' },
    { title: 'Books Returned', value: 3, color: '#00b4d8' },
    { title: 'Pending Returns', value: 2, color: '#ff6b6b' },
    { title: 'Fines Due', value: '₹30', color: '#ffb703' },
  ];

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Books Issued',
        data: [1, 2, 1, 3, 2, 1, 2],
        backgroundColor: '#03045e',
        borderRadius: 6,
      },
      {
        label: 'Books Returned',
        data: [1, 1, 1, 2, 1, 3, 2],
        backgroundColor: '#fca311',
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ['Issue', 'Returned', 'Pending'],
    datasets: [
      {
        data: [5, 3, 2],
        backgroundColor: ['#03045e', '#fca311', 'red'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#03045e',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <>
      <div className="admin-dashboard">
        <StudentSidebar />

        <div className="admin-main-content">
          <StudentLogoutButton />

          <div className="card-container">
            {cardData.map((card, i) => (
              <div className="dashboard-card" key={i} /*style={{ backgroundColor: card.color }}*/>
                <h4>{card.title}</h4>
                <p>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="chart-container">
            <div className="bar-chart-section">
              <h4>Books Issued vs Returned (Monthly)</h4>
              <Bar data={barData} />
            </div>

            <div className="pie-chart-section">
              <h4>Return & Fine Status</h4>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
      </div>

      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-popup">
            <h2>👋 Welcome to Student Panel</h2>
            <p>
              You can now view your dashboard, issue books, and more.
              Use the sidebar to navigate between sections.
            </p>
            <button className="thanks-btn" onClick={() => setShowWelcome(false)}>
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
};
