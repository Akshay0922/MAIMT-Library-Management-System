// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Table, Button, Form, Row, Col } from "react-bootstrap";
// // import { AdminSidebar } from "../AdminSidebar";
// // import "./ManageUsers.css";

// // export const ManageUsers = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:3000/auth/all-users");

// //       const fetchedUsers = Array.isArray(response.data)
// //         ? response.data
// //         : response.data.users || [];

// //       // Sort by role: admin first
// //       const sortedUsers = [...fetchedUsers].sort((a, b) => {
// //         if (a.role === "admin" && b.role !== "admin") return -1;
// //         if (a.role !== "admin" && b.role === "admin") return 1;
// //         return 0;
// //       });

// //       setUsers(sortedUsers);
// //     } catch (err) {
// //       console.error("Failed to fetch users:", err);
// //     }
// //   };

// //   const filteredUsers = users.filter((user) =>
// //     user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div className="admin-dashboard d-flex">
// //       <AdminSidebar />
// //       <div className="admin-main-content p-4 w-100">
// //         <div className="admin-card shadow p-4">
// //           <h3 className="mb-4 text-center text-primary">Manage Users</h3>

// //           <Form className="mb-3">
// //             <Row>
// //               <Col md={8}>
// //                 <Form.Control
// //                   type="text"
// //                   placeholder="🔍 Search users by name..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="custom-input"
// //                 />
// //               </Col>
// //               <Col md={4}>
// //                 <Button className="w-100 custom-btn" onClick={fetchUsers}>
// //                   Refresh
// //                 </Button>
// //               </Col>
// //             </Row>
// //           </Form>

// //           <Table bordered hover responsive className="custom-table text-center">
// //             <thead>
// //               <tr>
// //                 <th>#</th>
// //                 <th>Name 👤</th>
// //                 <th>Email 📧</th>
// //                 <th>Role 🎓</th>
// //                 <th>Last Login</th>
// //                 <th>Actions ⚙️</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredUsers.length > 0 ? (
// //                 filteredUsers.map((user, index) => (
// //                   <tr key={user._id || index}>
// //                     <td>{index + 1}</td>
// //                     <td>{user.userName || "N/A"}</td>
// //                     <td>{user.email || "N/A"}</td>
// //                     <td>{user.role || "User"}</td>
// //                     <td>
// //                       {user.lastLogin
// //                         ? new Date(user.lastLogin).toLocaleString()
// //                         : "Never"}
// //                     </td>
// //                     <td>
// //                       <Button variant="outline-primary" size="sm" className="me-2">
// //                         Edit
// //                       </Button>
// //                       <Button variant="outline-danger" size="sm">
// //                         Delete
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="6">No users found.</td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </Table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Table,
//   Form,
//   Button,
//   Row,
//   Col,
//   Badge,
// } from "react-bootstrap";

// export const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/admin/all-users-combined");
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Error fetching users:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Search by username or email
//   const filteredUsers = users.filter((user) =>
//   (user.userName?.toLowerCase() || "").includes(search.toLowerCase()) ||
//   (user.email?.toLowerCase() || "").includes(search.toLowerCase())
// );

//   // Admins on top
//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     if (a.role === "admin" && b.role !== "admin") return -1;
//     if (a.role !== "admin" && b.role === "admin") return 1;
//     return 0;
//   });

//   // Toggle block/unblock user or admin
//   const toggleBlock = async (userId, isBlocked) => {
//     try {
//       await axios.patch(`http://localhost:3000/auth/block-user/${userId}`, {
//         isBlocked: !isBlocked,
//       });
//       fetchUsers(); // Refresh
//     } catch (error) {
//       console.error("Error updating block status:", error.message);
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <Row className="align-items-center mb-3">
//         <Col md={6}>
//           <h2>Manage Users & Admins</h2>
//         </Col>
//         <Col md={4}>
//           <Form.Control
//             type="text"
//             placeholder="Search by username or email"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </Col>
//         <Col md={2}>
//           <Button variant="primary" onClick={fetchUsers}>
//             Refresh
//           </Button>
//         </Col>
//       </Row>

//       <Table striped bordered hover responsive>
//         <thead className="table-dark">
//           <tr>
//             <th>#</th>
//             <th>User Name</th>
//             <th>Email</th>
//             <th>Last Login</th>
//             <th>Role</th>
//             <th>Course</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedUsers.length > 0 ? (
//             sortedUsers.map((user, index) => (
//               <tr key={user._id || index}>
//                 <td>{index + 1}</td>
//                 <td>{user.userName}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   {user.lastLogin
//                     ? new Date(user.lastLogin).toLocaleString()
//                     : "Never"}
//                 </td>
//                 <td>
//                   <Badge bg={user.role === "admin" ? "danger" : "secondary"}>
//                     {user.role}
//                   </Badge>
//                 </td>
//                 <td>
//                   {user.role === "admin" ? (
//                     <em className="text-muted">Not applicable</em>
//                   ) : (
//                     user.course || "N/A"
//                   )}
//                 </td>
//                 <td>
//                   <Badge bg={user.isBlocked ? "danger" : "success"}>
//                     {user.isBlocked ? "Blocked" : "Active"}
//                   </Badge>
//                 </td>
//                 <td>
//                   <Button
//                     size="sm"
//                     variant={user.isBlocked ? "success" : "danger"}
//                     onClick={() => toggleBlock(user._id, user.isBlocked)}
//                   >
//                     {user.isBlocked ? "Unblock" : "Block"}
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="text-center">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };


// AdminUserTabs.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { AdminSidebar } from "../AdminSidebar";
import "./ManageUsers.css"; // Import your CSS

export const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/admin/all-admin");
      setAdmins(data || []);
    } catch (err) {
      console.error("Failed to fetch admins:", err);
      setAdmins([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/auth/all-users");
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    if (activeTab === "admin") fetchAdmins();
    else fetchUsers();
  }, [activeTab]);

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Tab Buttons */}
        <div className="tabs">
          <button
            onClick={() => setActiveTab("admin")}
            className={`tab-btn ${activeTab === "admin" ? "active" : ""}`}
          >
            Admins
          </button>
          <button
            onClick={() => setActiveTab("user")}
            className={`tab-btn ${activeTab === "user" ? "active" : ""}`}
          >
            Users
          </button>
        </div>

        {/* Heading */}
        <h2 className="heading">{activeTab === "admin" ? "All Admins" : "All Users"}</h2>

        {/* Table Container (Scrollable) */}
        <div className="table-container">
          {activeTab === "admin" ? <AdminTable data={admins} /> : <UserTable data={users} />}
        </div>
      </div>
    </div>
  );
};

const AdminTable = ({ data }) => (
  <table className="user-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Admin Name</th>
        <th>Email</th>
        <th>Admin No</th>
        <th>Last Login</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {data?.length === 0 ? (
        <tr>
          <td colSpan="6" className="no-data">No data found</td>
        </tr>
      ) : (
        data.map((admin, index) => (
          <tr key={admin._id}>
            <td>{index + 1}</td>
            <td>{admin.adminName || "N/A"}</td>
            <td>{admin.adminEmail || "N/A"}</td>
            <td>{admin.adminNo || "N/A"}</td>
            <td>{admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "N/A"}</td>
            <td>
              <button className="btn block">Block</button>
              <button className="btn unblock">Unblock</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

const UserTable = ({ data }) => (
  <table className="user-table">
    <thead>
      <tr>
        <th>#</th>
        <th>User Name</th>
        <th>Roll No.</th>
        <th>Email</th>
        <th>Batch</th>
        <th>Course</th>
        <th>Last Login</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {data?.length === 0 ? (
        <tr>
          <td colSpan="8" className="no-data">No data found</td>
        </tr>
      ) : (
        data.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.userName || "N/A"}</td>
            <td>{user.rollNumber || "N/A"}</td>
            <td>{user.email || "N/A"}</td>
            <td>{user.batch || "N/A"}</td>
            <td>{user.course || "N/A"}</td>
            <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}</td>
            <td>
              <button className="btn block">Block</button>
              <button className="btn unblock">Unblock</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);
