import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import axios from 'axios';


import './adminLogin.css';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      adminId: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      adminId: Yup.string().max(22, 'Id must be of less than 22 characters').required('Id is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('http://localhost:5000/api/login', values);
        toast.success(response.data.message);
        navigate('/home');
      } catch (error) {
        if (error.response?.status === 401) {
          setErrors({ password: 'Invalid email or password' });
        } else {
          alert('Server Error. Please try again later.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-screen">
      <Container>
        <Card className="p-4 login-container">
          <h5 className="text-center fw-bold mb-4 login-heading">LOG IN</h5>

          <Form noValidate className="mt-3" onSubmit={formik.handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Admin Id</Form.Label>
              <Form.Control
                type="adminId"
                name="adminId"
                placeholder="Enter your id"
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.adminId && !!formik.errors.adminId}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.adminId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label>Password</Form.Label>
                <Link to="/forgot-password" className="login-forgot-password">Forgot Password?</Link>
              </div>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              {formik.values.password && (
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 login-btn mt-3">LOG IN</Button>
          </Form>

          <div className="text-center mt-3 small">
            Don't have an account? <Link to="/admin-signup" className="signup-link">Sign up</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};