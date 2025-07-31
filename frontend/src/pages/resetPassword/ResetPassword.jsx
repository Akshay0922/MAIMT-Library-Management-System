import { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner, ProgressBar, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import ResetPasswordImage from '../../assets/resetPasswordImage.png';
import './resetPassword.css';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const email = localStorage.getItem("resetPassword");

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&#]/.test(password)) score++;
    if (score <= 1) return 'Weak';
    if (score === 2 || score === 3) return 'Medium';
    return 'Strong';
  };

  const renderStrengthBar = () => {
    let variant = 'danger';
    let now = 33;
    if (passwordStrength === 'Medium') {
      variant = 'warning';
      now = 66;
    } else if (passwordStrength === 'Strong') {
      variant = 'success';
      now = 100;
    }
    return (
      <div className="strength-bar-wrapper">
        <ProgressBar now={now} variant={variant} animated label={passwordStrength} />
      </div>
    );
  };

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required('Required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/, 'Weak password'),
      confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      if (!email) {
        toast.error("Email not found in localStorage. Please restart the reset flow.");
        return;
      }
      setResetLoading(true);
      try {
        const res = await axios.post('http://localhost:3000/auth/reset-password', {
          email,
          newPassword: values.newPassword,
        });
        toast.success(res.data.message || 'Password reset successfully!');
        localStorage.removeItem("resetPassword");
        setTimeout(() => {
          setResetLoading(false);
          navigate('/student-login');
        }, 2000);
      } catch (err) {
        setResetLoading(false);
        const msg = err.response?.data?.message;
        if (msg === 'New password cannot be same as old password') {
          toast.error('You are using your old password. Please enter a new one.');
        } else {
          toast.error(msg || 'Reset failed. Try again.');
        }
      }
    },
  });

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(formik.values.newPassword));
  }, [formik.values.newPassword]);

  return (
    <div className="reset-password-screen">
      <Container className="my-5">
        <Card className="p-4 shadow-lg reset-password-container">
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0 text-center">
              <img
                src={ResetPasswordImage}
                alt="Reset Password Illustration"
                className="reset-password-img"
              />
            </Col>
            <Col md={6}>
              <h4 className="text-center mb-4">Reset Password</h4>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type={showNewPass ? 'text' : 'password'}
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.newPassword && !!formik.errors.newPassword}
                  />
                  <span
                    className="reset-password-toggle-icon"
                    onClick={() => setShowNewPass(!showNewPass)}
                  >
                    {showNewPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {formik.values.newPassword && renderStrengthBar()}
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showConfirmPass ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.confirmPassword && !!formik.errors.confirmPassword
                    }
                  />
                  <span
                    className="reset-password-toggle-icon"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100 reset-btn" disabled={resetLoading}>
                  {resetLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Resetting Password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};