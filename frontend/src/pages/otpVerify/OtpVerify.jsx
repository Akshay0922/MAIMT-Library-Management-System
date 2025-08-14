import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import OtpPageImage from '../../assets/otpPageImage.png';
import './otpVerify.css';

export const OtpVerify = () => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetPassword");

  useEffect(() => {
    if (!email) {
      toast.error('No email found. Please restart the process.');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:3000/auth/verify-otp', {
          email,
          otp: values.otp,
        });
        toast.success('OTP verified successfully!');
        setVerified(true);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Invalid OTP');
      }
    },
  });

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    formik.setFieldValue('otp', newOtp.join(''));

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  if (!email) {
    return (
      <div className="otp-wrapper">
        <Spinner animation="border" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (verified) {
    navigate('/reset-password', { state: { email } });
    return null;
  }

  return (
    <div className="otp-wrapper">
      <div className="otp-image-container">
        <img className="otp-page-image" src={OtpPageImage} alt="OTP Page" />
      </div>

      <Container className="otp-container">
        <Card className="otp-card p-4">
          <h4 className="text-center mb-3 text-navy">Verify OTP</h4>
          <Alert variant="info" className="text-center">
            OTP has been sent to <strong>{email}</strong>
          </Alert>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Label className="mt-2">Enter 6-digit OTP</Form.Label>
            <div className="otp-inputs mb-3">
              {otpDigits.map((digit, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  className="otp-digit"
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  ref={(el) => (otpRefs.current[index] = el)}
                />
              ))}
            </div>

            {formik.touched.otp && formik.errors.otp && (
              <div className="text-danger text-center mb-3">{formik.errors.otp}</div>
            )}

            <Row>
              <Col>
                <Button type="submit" className="w-100 login-btn">
                  Verify OTP
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
};