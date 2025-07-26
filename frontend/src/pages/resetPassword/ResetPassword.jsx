// import { useState, useEffect } from 'react';
// import { Container, Form, Button, Spinner, ProgressBar } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// export const ResetPassword = ({ email }) => {
//   const navigate = useNavigate();
//   const [showNewPass, setShowNewPass] = useState(false);
//   const [showConfirmPass, setShowConfirmPass] = useState(false);
//   const [resetLoading, setResetLoading] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState('');

//   const getPasswordStrength = (password) => {
//     let score = 0;
//     if (password.length >= 6) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/\d/.test(password)) score++;
//     if (/[@$!%*?&#]/.test(password)) score++;

//     if (score <= 1) return 'Weak';
//     if (score === 2 || score === 3) return 'Medium';
//     return 'Strong';
//   };

//   const renderStrengthBar = () => {
//     let variant = 'danger';
//     let now = 33;
//     if (passwordStrength === 'Medium') {
//       variant = 'warning';
//       now = 66;
//     } else if (passwordStrength === 'Strong') {
//       variant = 'success';
//       now = 100;
//     }
//     return (
//       <div className="mt-2">
//         <ProgressBar
//           now={now}
//           variant={variant}
//           className="mb-2"
//           animated
//           label={passwordStrength}
//         />
//       </div>
//     );
//   };

//   const formik = useFormik({
//     initialValues: {
//       newPassword: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       newPassword: Yup.string()
//         .required('Required')
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
//           'Weak password'
//         ),
//       confirmPassword: Yup.string()
//         .required('Required')
//         .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
//     }),
//     onSubmit: async (values) => {
//       setResetLoading(true);
//       try {
//         const res = await axios.post('http://localhost:3000/auth/reset-password', {
//           email,
//           newPassword: values.newPassword,
//         });

//         toast.success(res.data.message || 'Password reset successfully!');
//         localStorage.removeItem("resetPassword");
//         setTimeout(() => {
//           setResetLoading(false);
//           navigate('/login');
//         }, 2000);
//       } catch (err) {
//         setResetLoading(false);
//         const msg = err.response?.data?.message;
//         if (msg === 'New password cannot be same as old password') {
//           toast.error('You are using your old password. Please enter a new one.');
//         } else {
//           toast.error(msg || 'Reset failed. Try again.');
//         }
//       }
//     },
//   });

//   useEffect(() => {
//     setPasswordStrength(getPasswordStrength(formik.values.newPassword));
//   }, [formik.values.newPassword]);

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: '#f8f9fa',
//       }}
//     >
//       <Container className="bg-light shadow rounded p-4" style={{ maxWidth: '400px' }}>
//         <Form noValidate onSubmit={formik.handleSubmit} className="fade show">
//           <h5 className="text-center mb-3">🔒 Step 3: Reset Password</h5>

//           {/* New Password */}
//           <Form.Group className="mb-3 position-relative">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type={showNewPass ? 'text' : 'password'}
//               name="newPassword"
//               value={formik.values.newPassword}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               isInvalid={formik.touched.newPassword && !!formik.errors.newPassword}
//             />
//             {formik.values.newPassword && (
//               <>
//                 <span
//                   className="password-toggle-icon"
//                   onClick={() => setShowNewPass(!showNewPass)}
//                   style={{
//                     position: 'absolute',
//                     top: '38px',
//                     right: '12px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {showNewPass ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//                 {renderStrengthBar()}
//               </>
//             )}
//             <Form.Control.Feedback type="invalid">
//               {formik.errors.newPassword}
//             </Form.Control.Feedback>
//           </Form.Group>

//           {/* Confirm Password */}
//           <Form.Group className="mb-3 position-relative">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type={showConfirmPass ? 'text' : 'password'}
//               name="confirmPassword"
//               value={formik.values.confirmPassword}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               isInvalid={
//                 formik.touched.confirmPassword && !!formik.errors.confirmPassword
//               }
//             />
//             {formik.values.confirmPassword && (
//               <span
//                 className="password-toggle-icon"
//                 onClick={() => setShowConfirmPass(!showConfirmPass)}
//                 style={{
//                   position: 'absolute',
//                   top: '38px',
//                   right: '12px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             )}
//             <Form.Control.Feedback type="invalid">
//               {formik.errors.confirmPassword}
//             </Form.Control.Feedback>
//           </Form.Group>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             className="w-100 login-btn"
//             disabled={resetLoading}
//           >
//             {resetLoading ? (
//               <>
//                 <Spinner animation="border" size="sm" className="me-2" />
//                 Resetting Password...
//               </>
//             ) : (
//               'Reset Password'
//             )}
//           </Button>
//         </Form>
//       </Container>
//     </div>
//   );
// };




import { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // ✅ Get email from localStorage
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
      <div className="mt-2">
        <ProgressBar
          now={now}
          variant={variant}
          className="mb-2"
          animated
          label={passwordStrength}
        />
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
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
          'Weak password'
        ),
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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9fa',
      }}
    >
      <Container className="bg-light shadow rounded p-4" style={{ maxWidth: '400px' }}>
        <Form noValidate onSubmit={formik.handleSubmit} className="fade show">
          <h5 className="text-center mb-3"><strong>Reset Password</strong></h5>

          {/* New Password */}
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
            {formik.values.newPassword && (
              <>
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowNewPass(!showNewPass)}
                  style={{
                    position: 'absolute',
                    top: '38px',
                    right: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {showNewPass ? <FaEyeSlash /> : <FaEye />}
                </span>
                {renderStrengthBar()}
              </>
            )}
            <Form.Control.Feedback type="invalid">
              {formik.errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password */}
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
            {formik.values.confirmPassword && (
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                style={{
                  position: 'absolute',
                  top: '38px',
                  right: '12px',
                  cursor: 'pointer',
                }}
              >
                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-100 login-btn"
            disabled={resetLoading}
          >
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
      </Container>
    </div>
  );
};
