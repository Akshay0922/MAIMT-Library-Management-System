// import { useState, useEffect, useRef } from 'react';
// import { Container, Form, Button, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { FaKey, FaSyncAlt } from 'react-icons/fa';

// export const OtpVerify = () => {
//   const location = useLocation();
//   const passedEmail = location.state?.email || '';
//   const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
//   const [verified, setVerified] = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const [resending, setResending] = useState(false);
//   const [email, setEmail] = useState('');
//   const otpRefs = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (passedEmail) {
//       setEmail(passedEmail);
//     } else {
//       toast.error('No email provided. Please restart the process.');
//       navigate('/forgot-password');
//     }
//   }, [passedEmail, navigate]);

//   useEffect(() => {
//     let timer;
//     if (resendCooldown > 0) {
//       timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [resendCooldown]);

//   const formik = useFormik({
//     initialValues: {
//       otp: '',
//     },
//     validationSchema: Yup.object({
//       otp: Yup.string()
//         .required('OTP is required')
//         .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         await axios.post('http://localhost:3000/auth/verify-otp', {
//           email : localStorage.getItem("resetPassword"),
//           otp: values.otp,
//         });
//         toast.success('OTP verified successfully!');
//         setVerified(true);
//       } catch (err) {
//         toast.error(err.response?.data?.message || 'Invalid OTP');
//       }
//     },
//   });

//   const handleOtpChange = (e, index) => {
//     const value = e.target.value;
//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...otpDigits];
//     newOtp[index] = value;
//     setOtpDigits(newOtp);

//     const joined = newOtp.join('');
//     formik.setFieldValue('otp', joined);

//     if (value && index < 5) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   // const handleResendOtp = async () => {
//   //   setResending(true);
//   //   try {
//   //     await axios.post('http://localhost:3000/auth/verify-email', { email });
//   //     toast.success('OTP resent successfully!');
//   //     setResendCooldown(30);
//   //   } catch (err) {
//   //     console.log('Resend OTP Error:', err); 
//   //     toast.error(err.response?.data?.message || 'Failed to resend OTP');
//   //   } finally {
//   //     setResending(false);
//   //   }
//   // };

//   if (!email) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//         <p className="mt-2">Loading...</p>
//       </div>
//     );
//   }

//   if (verified) {
//     navigate('/reset-password', { state: { email } });
//     return null;
//   }

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
//       <Card className="p-4 shadow" style={{ maxWidth: '450px', width: '100%' }}>
//         <h5 className="text-center mb-3">🔐 Verify OTP</h5>
//         <Alert variant="info" className="text-center">
//           OTP has been sent to <strong>{email}</strong>
//         </Alert>

//         <Form onSubmit={formik.handleSubmit}>
//           <Form.Label>Enter 6-digit OTP</Form.Label>
//           <div className="d-flex justify-content-between gap-2 mb-2">
//             {otpDigits.map((digit, index) => (
//               <Form.Control
//                 key={index}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 className="text-center border border-secondary rounded shadow-sm"
//                 style={{ width: '45px', height: '50px', fontSize: '20px' }}
//                 onChange={(e) => handleOtpChange(e, index)}
//                 onKeyDown={(e) => handleOtpKeyDown(e, index)}
//                 ref={(el) => (otpRefs.current[index] = el)}
//               />
//             ))}
//           </div>

//           {formik.touched.otp && formik.errors.otp && (
//             <div className="text-danger text-center mb-3">{formik.errors.otp}</div>
//           )}

//           <Row className="mb-3">
//             <Col xs={7}>
//               <Button type="submit" className="w-100 login-btn">
//                 <FaKey className="me-2" /> Verify OTP
//               </Button>
//             </Col>
//             <Col xs={5}>
//               <Button
//                 variant="link"
//                 className="p-0 text-primary w-100"
//                 onClick={handleResendOtp}
//                 disabled={resendCooldown > 0 || resending}
//                 style={{ textDecoration: 'none' }}
//               >
//                 <div className="d-flex align-items-center justify-content-center gap-2">
//                   {resending ? (
//                     <>
//                       <Spinner animation="border" size="sm" style={{ color: '#8f55f3' }} />
//                       <span style={{ color: '#8f55f3', fontWeight: '500' }}>Resending...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FaSyncAlt size={15} style={{ color: 'black' }} />
//                       <span style={{ color: '#8f55f3', fontWeight: '500' }}>
//                         Resend {resendCooldown > 0 && `(${resendCooldown}s)`}
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Card>
//     </Container>
//   );
// }; 



import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaKey } from 'react-icons/fa';

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
    initialValues: {
      otp: '',
    },
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

    const joined = newOtp.join('');
    formik.setFieldValue('otp', joined);

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
      <div className="text-center mt-5">
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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <Card className="p-4 shadow" style={{ maxWidth: '450px', width: '100%' }}>
        <h5 className="text-center mb-3">🔐 Verify OTP</h5>
        <Alert variant="info" className="text-center">
          OTP has been sent to <strong>{email}</strong>
        </Alert>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Label>Enter 6-digit OTP</Form.Label>
          <div className="d-flex justify-content-between gap-2 mb-2">
            {otpDigits.map((digit, index) => (
              <Form.Control
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                className="text-center border border-secondary rounded shadow-sm"
                style={{ width: '45px', height: '50px', fontSize: '20px' }}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                ref={(el) => (otpRefs.current[index] = el)}
              />
            ))}
          </div>

          {formik.touched.otp && formik.errors.otp && (
            <div className="text-danger text-center mb-3">{formik.errors.otp}</div>
          )}

          <Row className="mb-3">
            <Col>
              <Button type="submit" className="w-100 login-btn">
                <FaKey className="me-2" /> Verify OTP
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};
