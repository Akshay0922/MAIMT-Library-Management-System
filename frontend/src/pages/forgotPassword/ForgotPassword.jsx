import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";

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
      const toastId = toast.loading("Sending OTP...", {
        style: {
          backgroundColor: "#061561",
          color: "white",
          fontWeight: "500",
        },
      });

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
        // Navigate to OTP verification page with email passed via state
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
    <div className="login-screen">
      <Container>
        <Card
          className="p-4 shadow-lg login-container mt-5"
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <h4 className="text-center mb-4" style={{ color: "#5f6fff" }}>
            Forgot Password
          </h4>
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
              style={{ backgroundColor: "#5f6fff" }}
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
        </Card>
      </Container>
    </div>
  );
};