import { useEffect, useState } from "react";
import axios from "axios";

import { AdminSidebar } from '../AdminSidebar';

import { AdminLogoutButton } from '../../../../components/adminLogoutButton/AdminLogoutButton';

import "./manageUsers.css";

export const ManageUsers = () => {

  const [activeTab, setActiveTab] = useState("admin");
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    setSearchTerm("");
    if (activeTab === "admin") fetchAdmins();
    else fetchUsers();
  }, [activeTab]);

  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />

        <div className="admin-manage-users-main-content shrink">
          <AdminLogoutButton />

          <div className="content">
            {/* Tabs */}
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

            {/* Search bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>

            <div className="table-container">
              {activeTab === "admin" ? (
                <AdminTable data={admins} searchTerm={searchTerm} fetchAdmins={fetchAdmins} />
              ) : (
                <UserTable data={users} searchTerm={searchTerm} fetchUsers={fetchUsers} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ADMIN TABLE
const AdminTable = ({ data, searchTerm, fetchAdmins }) => {
  const handleDeleteAdmin = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this admin?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/admin/delete/${id}`);
      fetchAdmins();
      alert("Admin deleted successfully.");
    } catch (err) {
      console.error("Delete admin failed:", err);
      alert("Failed to delete admin.");
    }
  };

  const filtered = data.filter(
    (admin) =>
      admin?.adminName?.toLowerCase().includes(searchTerm) ||
      admin?.adminEmail?.toLowerCase().includes(searchTerm)
  );

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Admin No</th>
          <th>Last Login</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filtered.length === 0 ? (
          <tr>
            <td colSpan="6" className="no-data">No data found</td>
          </tr>
        ) : (
          filtered.map((admin, index) => (
            <tr key={admin._id}>
              <td>{index + 1}</td>
              <td>{admin.adminName || "N/A"}</td>
              <td>{admin.adminEmail || "N/A"}</td>
              <td>{admin.adminNo || "N/A"}</td>
              <td>{admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "N/A"}</td>
              <td>
                <button className="btn delete" onClick={() => handleDeleteAdmin(admin._id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

// USER TABLE
const UserTable = ({ data, searchTerm, fetchUsers }) => {
  const handleDeleteUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/auth/delete/${id}`);
      fetchUsers();
      alert("User deleted successfully.");
    } catch (err) {
      console.error("Delete user failed:", err);
      alert("Failed to delete user.");
    }
  };

  const filtered = data.filter(
    (user) =>
      user?.userName?.toLowerCase().includes(searchTerm) ||
      user?.email?.toLowerCase().includes(searchTerm)
  );

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>Roll No.</th>
          <th>Email</th>
          <th>Batch</th>
          <th>Course</th>
          <th>Last Login</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filtered.length === 0 ? (
          <tr>
            <td colSpan="8" className="no-data">No data found</td>
          </tr>
        ) : (
          filtered.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.userName || "N/A"}</td>
              <td>{user.rollNumber || "N/A"}</td>
              <td>{user.email || "N/A"}</td>
              <td>{user.batch || "N/A"}</td>
              <td>{user.course || "N/A"}</td>
              <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}</td>
              <td>
                <button className="btn delete" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
