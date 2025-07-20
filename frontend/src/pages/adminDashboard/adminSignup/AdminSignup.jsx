import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, ProgressBar } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './adminSignup.css';

const validationSchema = Yup.object().shape({
  adminName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Only alphabets allowed')
    .min(2, 'Minimum 2 characters')
    .required('Admin Name is required'),
  adminEmail: Yup.string()
    .email('Invalid email format')
    .required('Admin Email is required'),
  adminNo: Yup.string()
    .matches(/^\d{6}$/, 'Must be exactly 6 digits')
    .required('Admin Number is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .matches(/[A-Z]/, 'One uppercase letter required')
    .matches(/[a-z]/, 'One lowercase letter required')
    .matches(/[0-9]/, 'One number required')
    .matches(/[@$!%*?&#]/, 'One special character required')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const AdminSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

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

  const renderStrengthBar = () => {
    let variant = 'danger', now = 33;
    if (passwordStrength === 'Medium') {
      variant = 'warning'; now = 66;
    } else if (passwordStrength === 'Strong') {
      variant = 'success'; now = 100;
    }

    return (
      <div className="mt-2">
        <ProgressBar now={now} variant={variant} animated label={passwordStrength} className="mb-2" />
      </div>
    );
  };

  return (
    <div className="signup-screen">
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Card className="p-4 signup-container">
          <h5 className="text-center fw-bold mb-4 signup-heading">ADMIN SIGNUP</h5>

          <Formik
            initialValues={{
              adminName: '',
              adminEmail: '',
              adminId: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const response = await fetch('http://localhost:5000/api/admin/signup', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(values),
                });

                const data = await response.json();
                toast.success(data.message || 'Admin registered successfully!');
                resetForm();
                navigate('/');
              } catch (err) {
                toast.error('Signup failed!');
                console.error(err);
              }
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              setFieldValue,
            }) => {
              const handlePasswordChange = (e) => {
                const password = e.target.value;
                setFieldValue('password', password);
                setPasswordStrength(getPasswordStrength(password));
              };

              return (
                <Form noValidate onSubmit={handleSubmit} className="form-data">
                  <Form.Group className="mb-3">
                    <Form.Label>Admin Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="adminName"
                      placeholder="Enter full name"
                      value={values.adminName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.adminName && !!errors.adminName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.adminName}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Admin Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="adminEmail"
                      placeholder="Enter email"
                      value={values.adminEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.adminEmail && !!errors.adminEmail}
                    />
                    <Form.Control.Feedback type="invalid">{errors.adminEmail}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Admin Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="adminNo"
                      placeholder="Enter 6-digit admin Number"
                      value={values.adminNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.adminNo && !!errors.adminNo}
                    />
                    <Form.Control.Feedback type="invalid">{errors.adminNo}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter password"
                      value={values.password}
                      onChange={handlePasswordChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                    />
                    {values.password && (
                      <>
                        <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {renderStrengthBar()}
                      </>
                    )}
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                    />
                    {values.confirmPassword && (
                      <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    )}
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>

                  <Button className="w-100 submit-btn" type="submit">REGISTER ADMIN</Button>
                </Form>
              );
            }}
          </Formik>

          <div className="text-center mt-3 small">
            Already registered?{' '}
            <Link to="/admin-login" className="login-link">Login</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};