
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './changePassword.css';

export const ChangePassword = () => {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&#]/.test(password)) score++;

    if (score <= 1) return 'Weak';
    if (score <= 3) return 'Medium';
    return 'Strong';
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(6, 'Minimum 6 characters')
      .matches(/[A-Z]/, 'At least one uppercase letter')
      .matches(/[a-z]/, 'At least one lowercase letter')
      .matches(/[0-9]/, 'At least one number')
      .matches(/[@$!%*?&#]/, 'At least one special character')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm your new password'),
  });

  const user = JSON.parse(localStorage.getItem('admin'));

const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const res = await axios.post("http://localhost:3000/admin/change-password", {
      adminId:user.id,  
      currentPassword:values.currentPassword,
      newPassword:values.newPassword,
    });

    toast.success(res.data.message);  // show success toast
    setTimeout(() => navigate('/admin-dashboard'), 1500);  // redirect after 1.5s
  } catch (err) {
    const msg = err.response?.data?.message || 'Failed to change password';
    toast.error(msg); 
  } finally {
    setSubmitting(false);  
  }
};

  return (
    <div className="change-password-wrapper">
      <h2 className="text-center mb-4">Change Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, touched, errors, setFieldValue, isSubmitting }) => {
          const handleNewPasswordChange = (e) => {
            const val = e.target.value;
            setFieldValue('newPassword', val);
            setPasswordStrength(getPasswordStrength(val));
          };

          return (
            <form className="change-password-form" onSubmit={handleSubmit}>
              {/* Current Password */}
              <div className="position-relative">
                <label>Current Password</label>
                <input
                  type={showCurrent ? 'text' : 'password'}
                  name="currentPassword"
                  value={values.currentPassword}
                  onChange={handleChange}
                />
                {values.currentPassword && (
                  <span className="password-toggle-icon" onClick={() => setShowCurrent(!showCurrent)}>
                    {showCurrent ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
                {errors.currentPassword && touched.currentPassword && (
                  <div className="error">{errors.currentPassword}</div>
                )}
              </div>

              {/* New Password */}
              <div className="position-relative">
                <label>New Password</label>
                <input
                  type={showNew ? 'text' : 'password'}
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleNewPasswordChange}
                />
                {values.newPassword && (
                  <span className="password-toggle-icon" onClick={() => setShowNew(!showNew)}>
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
                {errors.newPassword && touched.newPassword && (
                  <div className="error">{errors.newPassword}</div>
                )}

                {/* Strength meter */}
                {values.newPassword && (
                  <div className="strength-meter-wrapper">
                    <div className={`strength-bar ${passwordStrength.toLowerCase()}`}></div>
                    <div className="strength-label">{passwordStrength}</div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="position-relative">
                <label>Confirm New Password</label>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                {values.confirmPassword && (
                  <span className="password-toggle-icon" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};