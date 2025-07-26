
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../AdminSidebar';
import './addNewBook.css';
import axios from "axios"

const validationSchema = Yup.object().shape({
  entryDate: Yup.date().required('Entry Date is required'),
  bookName: Yup.string().required('Book Name is required'),
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author name is required'),
  edition: Yup.string().required('Edition is required'),
  volume: Yup.string().required('Volume is required'),
  department: Yup.string().required('Department is required'),
  course: Yup.string().required('Course is required'),
  pages: Yup.number().min(1).required('Pages required'),
  isbn: Yup.string().required('ISBN is required'),
  noOfBooks: Yup.number().min(1).required('Number of books required'),
  rackNumber: Yup.string().required('Rack number is required'),
  shelfNo: Yup.string().required('Shelf number is required'),
  publisher: Yup.string().required('Publisher is required'),
  year: Yup.number().min(1000).max(new Date().getFullYear()).required('Publisher Year is required'),
  place: Yup.string().required('Place is required'),
  vendor: Yup.string().required('Vendor name is required'),
  billNo: Yup.string().required('Bill No is required'),
  billDate: Yup.date().required('Bill Date is required'),
  cost: Yup.number().min(0).required('Cost is required')
});

export const AddNewBook = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-add-new-book-main-content shrink">
        <div className="mb-2">
          <Button variant="light" className="back-btn" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <Container className="d-flex justify-content-center align-items-center h-100">
          <Card className="p-4 add-book-container">
            <h5 className="text-center fw-bold mb-4 add-book-heading">ADD NEW BOOK</h5>

            <Formik
              initialValues={{
                entryDate: "",
                bookName: "",
                title: "",
                author: "",
                edition: "",
                volume: "",
                department: "",
                course: "",
                pages: "",
                isbn: "",
                noOfBooks: "",
                rackNumber: "",
                shelfNo: "",
                publisher: "",
                year: "",
                place: "",
                vendor: "",
                billNo: "",
                billDate: "",
                cost: ""
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const payload = {
                    ...values,
                    pages: Number(values.pages),
                    noOfBooks: Number(values.noOfBooks),
                    year: Number(values.year),
                    cost: Number(values.cost),
                  };

                  const response = await axios.post("http://localhost:3000/library/add-books", payload, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  if (response.status === 200 || response.status === 201) {
                    toast.success("Book added successfully!");
                    resetForm();
                    navigate('/manage-books');
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
                    <Col md={4}><Form.Group><Form.Label>Entry Date</Form.Label>
                      <Form.Control type="date" name="entryDate" value={values.entryDate} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.entryDate && !!errors.entryDate} />
                      <Form.Control.Feedback type="invalid">{errors.entryDate}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Book Name</Form.Label>
                      <Form.Control type="text" name="bookName" value={values.bookName} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.bookName && !!errors.bookName} />
                      <Form.Control.Feedback type="invalid">{errors.bookName}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Title</Form.Label>
                      <Form.Control type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.title && !!errors.title} />
                      <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group></Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}><Form.Group><Form.Label>Author</Form.Label>
                      <Form.Control type="text" name="author" value={values.author} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.author && !!errors.author} />
                      <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Edition</Form.Label>
                      <Form.Control type="text" name="edition" value={values.edition} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.edition && !!errors.edition} />
                      <Form.Control.Feedback type="invalid">{errors.edition}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Volume</Form.Label>
                      <Form.Control type="text" name="volume" value={values.volume} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.volume && !!errors.volume} />
                      <Form.Control.Feedback type="invalid">{errors.volume}</Form.Control.Feedback>
                    </Form.Group></Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}><Form.Group><Form.Label>Department</Form.Label>
                      <Form.Select name="department" value={values.department} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.department && !!errors.department}>
                        <option value="">Select Department</option>
                        <option value="Computer Application">Computer Application</option>
                        <option value="Management">Management</option>
                        <option value="General">General</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
                    </Form.Group></Col>

                    <Col md={4}><Form.Group><Form.Label>Course</Form.Label>
                      <Form.Select name="course" value={values.course} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.course && !!errors.course}>
                        <option value="">Select Course</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="BBA">BBA</option>
                        <option value="MBA">MBA</option>
                        <option value="BCA CTIS">BCA CTIS</option>
                        <option value="BCA AI">BCA AI</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
                    </Form.Group></Col>

                    <Col md={4}><Form.Group><Form.Label>Pages</Form.Label>
                      <Form.Control type="number" name="pages" value={values.pages} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.pages && !!errors.pages} />
                      <Form.Control.Feedback type="invalid">{errors.pages}</Form.Control.Feedback>
                    </Form.Group></Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}><Form.Group><Form.Label>ISBN</Form.Label>
                      <Form.Control type="text" name="isbn" value={values.isbn} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.isbn && !!errors.isbn} />
                      <Form.Control.Feedback type="invalid">{errors.isbn}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>No. of Books</Form.Label>
                      <Form.Control type="number" name="noOfBooks" value={values.noOfBooks} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.noOfBooks && !!errors.noOfBooks} />
                      <Form.Control.Feedback type="invalid">{errors.noOfBooks}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Rack Number</Form.Label>
                      <Form.Control type="text" name="rackNumber" value={values.rackNumber} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.rackNumber && !!errors.rackNumber} />
                      <Form.Control.Feedback type="invalid">{errors.rackNumber}</Form.Control.Feedback>
                    </Form.Group></Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}><Form.Group><Form.Label>Shelf Number</Form.Label>
                      <Form.Control type="text" name="shelfNo" value={values.shelfNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.shelfNo && !!errors.shelfNo} />
                      <Form.Control.Feedback type="invalid">{errors.shelfNo}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Publisher</Form.Label>
                      <Form.Control type="text" name="publisher" value={values.publisher} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.publisher && !!errors.publisher} />
                      <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Publish Year</Form.Label>
                      <Form.Control type="number" name="year" value={values.year} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.year && !!errors.year} />
                      <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                    </Form.Group></Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}><Form.Group><Form.Label>Place</Form.Label>
                      <Form.Control type="text" name="place" value={values.place} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.place && !!errors.place} />
                      <Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Vendor Name</Form.Label>
                      <Form.Control type="text" name="vendor" value={values.vendor} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.vendor && !!errors.vendor} />
                      <Form.Control.Feedback type="invalid">{errors.vendor}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Bill No</Form.Label>
                      <Form.Control type="text" name="billNo" value={values.billNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.billNo && !!errors.billNo} />
                      <Form.Control.Feedback type="invalid">{errors.billNo}</Form.Control.Feedback>
                    </Form.Group></Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}><Form.Group><Form.Label>Bill Date</Form.Label>
                      <Form.Control type="date" name="billDate" value={values.billDate} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.billDate && !!errors.billDate} />
                      <Form.Control.Feedback type="invalid">{errors.billDate}</Form.Control.Feedback>
                    </Form.Group></Col>
                    <Col md={6}><Form.Group><Form.Label>Cost on Bill</Form.Label>
                      <Form.Control type="number" step="0.01" name="cost" value={values.cost} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.cost && !!errors.cost} />
                      <Form.Control.Feedback type="invalid">{errors.cost}</Form.Control.Feedback>
                    </Form.Group></Col>
                  </Row>

                  <Button type="submit" className="w-100 submit-btn">Add Book</Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </div>
    </div>
  );
};
