import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import { AdminSidebar } from '../../AdminSidebar';

import './issueBook.css';

import axios from "axios";

const validationSchema = Yup.object().shape({
  rollNo: Yup.string().required('Roll No is required'),
  name: Yup.string().required('Student name is required'),
  department: Yup.string().required('Department is required'),
  accessionNo: Yup.string().required('Accession No is required'),
  title: Yup.string().required('Book Title is required'),
  author: Yup.string().required('Author is required'),
  issueDate: Yup.date().required('Issue Date is required'),
  dueDate: Yup.date().required('Due Date is required'),
  time: Yup.string().required('Time is required'),
  fine: Yup.number().min(0).required('Fine is required')
});

export const IssueBook = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-issue-book-main-content shrink">
        <div className="mb-2">
          <Button variant="light" className="back-btn" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <Container className="d-flex justify-content-center align-items-center h-100">
          <Card className="p-4 issue-book-container">
            <h5 className="text-center fw-bold mb-4 issue-book-heading">ISSUE BOOK</h5>

            <Formik
              initialValues={{
                rollNo: '',
                name: '',
                department: '',
                accessionNo: '',
                title: '',
                author: '',
                issueDate: '',
                dueDate: '',
                time: '',
                fine: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const payload = {
                    ...values,
                    fine: Number(values.fine),
                  };

                  const response = await axios.post("http://localhost:3000/library/issue-book", payload, {
                    headers: { "Content-Type": "application/json" },
                  });

                  if (response.status === 200 || response.status === 201) {
                    toast.success("Book issued successfully!");
                    resetForm();
                    navigate('/issued-books');
                  } else {
                    toast.error("Something went wrong");
                  }
                } catch (error) {
                  toast.error("Server error");
                  console.error("Axios error:", error);
                }
              }}
            >
              {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className="form-data">

                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Roll No</Form.Label>
                        <Form.Control type="text" name="rollNo" value={values.rollNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.rollNo && !!errors.rollNo} />
                        <Form.Control.Feedback type="invalid">{errors.rollNo}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.name && !!errors.name} />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Department</Form.Label>
                        <Form.Select name="department" value={values.department} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.department && !!errors.department}>
                          <option value="">Select Department</option>
                          <option value="Computer Application">Computer Application</option>
                          <option value="Management">Management</option>
                          <option value="General">General</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Accession No</Form.Label>
                        <Form.Control type="text" name="accessionNo" value={values.accessionNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.accessionNo && !!errors.accessionNo} />
                        <Form.Control.Feedback type="invalid">{errors.accessionNo}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.title && !!errors.title} />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" name="author" value={values.author} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.author && !!errors.author} />
                        <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Issue Date</Form.Label>
                        <Form.Control type="date" name="issueDate" value={values.issueDate} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.issueDate && !!errors.issueDate} />
                        <Form.Control.Feedback type="invalid">{errors.issueDate}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control type="date" name="dueDate" value={values.dueDate} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.dueDate && !!errors.dueDate} />
                        <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" name="time" value={values.time} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.time && !!errors.time} />
                        <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Fine</Form.Label>
                        <Form.Control type="number" step="0.01" name="fine" value={values.fine} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.fine && !!errors.fine} />
                        <Form.Control.Feedback type="invalid">{errors.fine}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button type="submit" className="w-100 submit-btn">Issue Book</Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </div>
    </div>
  );
};