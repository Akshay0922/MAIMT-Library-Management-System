import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./editProfile.css";

export const EditProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");

  const fetchAdminData = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("admin"))._id;
      const res = await axios.get(`http://localhost:5000/api/admins/${id}`);
      setAdmin(res.data);
      setPreview(res.data.profilePic);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("adminName", admin.adminName);
      formData.append("adminEmail", admin.adminEmail);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const res = await axios.put(
        `http://localhost:5000/api/admins/${admin._id}`,
        formData
      );

      alert("Profile updated successfully!");
      localStorage.setItem("admin", JSON.stringify(res.data));
      navigate("/admin-profile");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Admin Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="edit-profile-image-section">
          <img
            src={preview}
            alt="Profile Preview"
            className="edit-profile-image"
          />
          <label htmlFor="profilePic" className="change-pic-btn">
            Change Profile Picture
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="edit-profile-fields">
          <label>Name:</label>
          <input
            type="text"
            name="adminName"
            value={admin.adminName || ""}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="adminEmail"
            value={admin.adminEmail || ""}
            onChange={handleChange}
          />
        </div>

        <div className="edit-profile-actions">
          <button type="submit" className="save-profile-btn">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin-profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};