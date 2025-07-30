// import { useEffect, useState } from 'react';
// import { AdminSidebar } from './adminSidebarRoutes/AdminSidebar';
// import { Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { AdminLogoutButton } from '../../components/adminLogoutButton/AdminLogoutButton';
// import './adminDashboard.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// export const AdminDashboard = () => {
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [selectedDept, setSelectedDept] = useState('All');

//   useEffect(() => {
//     const justLoggedIn = sessionStorage.getItem("showWelcome");
//     if (justLoggedIn === "true") {
//       setShowWelcome(true);
//       sessionStorage.removeItem("showWelcome");
//     }
//   }, []);

//   const cardData = [
//     { title: 'Total Books', value: 1240 },
//     { title: 'Issued Books', value: 520 },
//     { title: 'Returned Books', value: 470 },
//     { title: 'Overdue Books', value: 75 },
//     { title: 'Available Books', value: 250 },
//   ];

//   const departments = ['All', 'Computer Applications', 'Management', 'General'];

//   const barDataSets = {
//     'All': {
//       issued: [120, 90, 140, 100, 160, 130, 110],
//       returned: [100, 70, 130, 90, 150, 120, 100]
//     },
//     'Computer Applications': {
//       issued: [60, 45, 70, 50, 80, 65, 55],
//       returned: [50, 35, 65, 45, 75, 60, 50]
//     },
//     'Management': {
//       issued: [40, 30, 50, 35, 55, 45, 40],
//       returned: [35, 25, 45, 30, 50, 40, 35]
//     },
//     'General': {
//       issued: [20, 15, 20, 15, 25, 20, 15],
//       returned: [15, 10, 20, 15, 25, 20, 15]
//     },
//   };

//   const barData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     datasets: [
//       {
//         label: 'Books Issued',
//         data: barDataSets[selectedDept].issued,
//         backgroundColor: '#03045e',
//         borderRadius: 6,
//       },
//       {
//         label: 'Books Returned',
//         data: barDataSets[selectedDept].returned,
//         backgroundColor: '#fca311',
//         borderRadius: 6,
//       },
//     ],
//   };

//   const pieData = {
//     labels: ['Issued', 'Returned', 'Available'],
//     datasets: [
//       {
//         data: [520, 470, 250],
//         backgroundColor: ['#03045e', '#fca311', '#d5e0ff'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const dynamicStats = [
//     { label: "Most Issued Book", value: "Data Structures" },
//     { label: "Top Department", value: "Computer Applications" },
//     { label: "Avg Return Time", value: "4.2 days" },
//     { label: "Pending Requests", value: "12" },
//   ];

//   return (
//     <>
//       <div className="admin-dashboard">
//         <AdminSidebar />
//         <div className="admin-dashboard-main-content shrink">
//           <AdminLogoutButton />
//           <div className="admin-dashboard-wrapper">

//             <div className="card-container">
//               {cardData.map((card, index) => (
//                 <div className="dashboard-card" key={index}>
//                   <h4>{card.title}</h4>
//                   <p>{card.value}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="chart-container">
//               <div className="bar-chart-section">
//                 <h4>Monthly Transactions</h4>

//                 <select
//                   className="chart-filter"
//                   value={selectedDept}
//                   onChange={(e) => setSelectedDept(e.target.value)}
//                 >
//                   {departments.map((dept, idx) => (
//                     <option key={idx} value={dept}>{dept}</option>
//                   ))}
//                 </select>

//                 <Bar data={barData} />
//               </div>

//               <div className="pie-chart-section">
//                 <h4>Book Status Overview</h4>
//                 <Pie data={pieData} />
//               </div>
//             </div>

//             <div className="dynamic-stats-container">
//               {dynamicStats.map((stat, idx) => (
//                 <div className="dynamic-stat-card" key={idx}>
//                   <h5>{stat.label}</h5>
//                   <p>{stat.value}</p>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>

//       {showWelcome && (
//         <div className="welcome-overlay">
//           <div className="welcome-popup">
//             <h2>👋 Welcome to Admin Panel</h2>
//             <p>
//               You now have full control to manage books, users, and monitor library activity.
//               Use the sidebar to navigate between sections.
//             </p>
//             <button className="thanks-btn" onClick={() => setShowWelcome(false)}>Okay</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };








import { useEffect, useState } from 'react';
import { AdminSidebar } from './adminSidebarRoutes/AdminSidebar';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { AdminLogoutButton } from '../../components/adminLogoutButton/AdminLogoutButton';
import './adminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export const AdminDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  const [cardData, setCardData] = useState([]);
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [dynamicStats, setDynamicStats] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const departments = ['All', 'Computer Applications', 'Management', 'General'];

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("showWelcome");
    if (justLoggedIn === "true") {
      setShowWelcome(true);
      sessionStorage.removeItem("showWelcome");
    }

    fetchDashboardData();
  }, []);

  useEffect(() => {
    fetchBarChartData(selectedDept);
  }, [selectedDept]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      const [cardsRes, pieRes, dynamicRes] = await Promise.all([
        fetch('/api/admin/stats/cards'),
        fetch('/api/admin/stats/pie'),
        fetch('/api/admin/stats/dynamic'),
      ]);

      const cards = await cardsRes.json();
      const pie = await pieRes.json();
      const dynamic = await dynamicRes.json();

      setCardData(cards);
      setPieData({
        labels: pie.labels,
        datasets: [{
          data: pie.values,
          backgroundColor: ['#03045e', '#fca311', '#d5e0ff'],
          borderWidth: 1,
        }],
      });
      setDynamicStats(dynamic);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBarChartData = async (dept) => {
    try {
      const res = await fetch(`/api/admin/stats/transactions?dept=${dept}`);
      const data = await res.json();

      setBarData({
        labels: data.labels,
        datasets: [
          {
            label: 'Books Issued',
            data: data.issued,
            backgroundColor: '#03045e',
            borderRadius: 6,
          },
          {
            label: 'Books Returned',
            data: data.returned,
            backgroundColor: '#fca311',
            borderRadius: 6,
          },
        ],
      });
    } catch (err) {
      console.error("Bar chart fetch error:", err);
    }
  };

  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />
        <div className="admin-dashboard-main-content shrink">
          <AdminLogoutButton />
          <div className="admin-dashboard-wrapper">
            {isLoading ? (
              <p>Loading dashboard...</p>
            ) : (
              <>
                <div className="card-container">
                  {cardData.map((card, index) => (
                    <div className="dashboard-card" key={index}>
                      <h4>{card.title}</h4>
                      <p>{card.value}</p>
                    </div>
                  ))}
                </div>

                <div className="chart-container">
                  <div className="bar-chart-section">
                    <h4>Monthly Transactions</h4>
                    <select
                      className="chart-filter"
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                    >
                      {departments.map((dept, idx) => (
                        <option key={idx} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {barData && <Bar data={barData} />}
                  </div>

                  <div className="pie-chart-section">
                    <h4>Book Status Overview</h4>
                    {pieData && <Pie data={pieData} />}
                  </div>
                </div>

                <div className="dynamic-stats-container">
                  {dynamicStats.map((stat, idx) => (
                    <div className="dynamic-stat-card" key={idx}>
                      <h5>{stat.label}</h5>
                      <p>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-popup">
            <h2>👋 Welcome to Admin Panel</h2>
            <p>
              You now have full control to manage books, users, and monitor library activity.
              Use the sidebar to navigate between sections.
            </p>
            <button className="thanks-btn" onClick={() => setShowWelcome(false)}>Okay</button>
          </div>
        </div>
      )}
    </>
  );
};
