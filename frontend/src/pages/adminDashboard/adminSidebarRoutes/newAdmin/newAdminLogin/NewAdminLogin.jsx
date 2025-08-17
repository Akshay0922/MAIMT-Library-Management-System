import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import axios from 'axios';

import { AdminSidebar } from '../../AdminSidebar';

import './NewAdminLogin.css';

export const NewAdminLogin = () => {
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
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("http://localhost:3000/admin/login", values)
        if (res.data.message) {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("admin", JSON.stringify(res.data.admin))
          toast.success(res.data.message)
          resetForm()
          navigate("/admin-dashboard")
          sessionStorage.setItem("showWelcome", "true");
        }
        else {
          toast.error(res.data.message || "Login failed!");
        }

      } catch (err) {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong during login!");
        }
      }
    },
  });


  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />

        <div className="new-admin-login-main-content shrink">
          <div className="mb-2">
            <Button
              variant="light"
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>

          <Container>
            <Card className="p-4 login-container">
              <h5 className="text-center fw-bold mb-4 login-heading">ADMIN LOGIN</h5>

              <Form noValidate className="mt-3" onSubmit={formik.handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Label>Admin Id</Form.Label>
                  <Form.Control
                    type="adminId"
                    name="adminId"
                    placeholder="Enter your id"
                    value={formik.values.adminId}
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
                Don't have an account? <Link to="/new-admin" className="signup-link">Sign up</Link>
              </div>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
};