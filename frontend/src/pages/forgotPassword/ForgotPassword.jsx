import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Form, Button, Card, Spinner, Row, Col } from "react-bootstrap";

import ForgotPasswordImage from '../../assets/forgotPasswordImage.png';

import "./forgotPassword.css";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const toastId = toast.loading("Sending OTP...");
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/verify-email",
          { email: values.email }
        );

        toast.update(toastId, {
          render: response.data.message || "OTP sent successfully",
          isLoading: false,
          autoClose: 2000,
          type: "success",
        });
        localStorage.setItem("resetPassword", values.email);
        setTimeout(() => {
          navigate("/verify-otp");
        }, 3000);
      } catch (error) {
        toast.update(toastId, {
          render: error.response?.data?.message || "Failed to send OTP",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.error("Error sending OTP:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="forgot-password-screen">
      <Container className="my-5">
        <Card className="p-4 shadow-lg forgot-password-container">
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0 text-center">
              <img
                src={ForgotPasswordImage}
                alt="Forgot Password Illustration"
                className="forgot-password-img"
              />
            </Col>
            <Col md={6}>
              <h4 className="text-center mb-4">Forgot Password</h4>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Registered Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 mt-4 login-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
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