
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { AdminSidebar } from '../../AdminSidebar';
// import './addNewBook.css';
// import axios from "axios"

// const validationSchema = Yup.object().shape({
//   entryDate: Yup.date().required('Entry Date is required'),
//   bookName: Yup.string().required('Book Name is required'),
//   title: Yup.string().required('Title is required'),
//   author: Yup.string().required('Author name is required'),
//   edition: Yup.string().required('Edition is required'),
//   volume: Yup.string().required('Volume is required'),
//   department: Yup.string().required('Department is required'),
//   course: Yup.string().required('Course is required'),
//   pages: Yup.number().min(1).required('Pages required'),
//   isbn: Yup.string().required('ISBN is required'),
//   noOfBooks: Yup.number().min(1).required('Number of books required'),
//   rackNumber: Yup.string().required('Rack number is required'),
//   shelfNo: Yup.string().required('Shelf number is required'),
//   publisher: Yup.string().required('Publisher is required'),
//   year: Yup.number().min(1000).max(new Date().getFullYear()).required('Publisher Year is required'),
//   place: Yup.string().required('Place is required'),
//   vendor: Yup.string().required('Vendor name is required'),
//   billNo: Yup.string().required('Bill No is required'),
//   billDate: Yup.date().required('Bill Date is required'),
//   cost: Yup.number().min(0).required('Cost is required')
// });

// export const AddNewBook = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="admin-dashboard">
//       <AdminSidebar />
//       <div className="admin-add-new-book-main-content shrink">
//         <div className="mb-2">
//           <Button variant="light" className="back-btn" onClick={() => navigate(-1)}>
//             Back
//           </Button>
//         </div>

//         <Container className="d-flex justify-content-center align-items-center h-100">
//           <Card className="p-4 add-book-container">
//             <h5 className="text-center fw-bold mb-4 add-book-heading">ADD NEW BOOK</h5>

//             <Formik
//               initialValues={{
//                 entryDate: "",
//                 bookName: "",
//                 title: "",
//                 author: "",
//                 edition: "",
//                 volume: "",
//                 department: "",
//                 course: "",
//                 pages: "",
//                 isbn: "",
//                 noOfBooks: "",
//                 rackNumber: "",
//                 shelfNo: "",
//                 publisher: "",
//                 year: "",
//                 place: "",
//                 vendor: "",
//                 billNo: "",
//                 billDate: "",
//                 cost: ""
//               }}
//               validationSchema={validationSchema}
//               onSubmit={async (values, { resetForm }) => {
//                 try {
//                   const payload = {
//                     ...values,
//                     pages: Number(values.pages),
//                     noOfBooks: Number(values.noOfBooks),
//                     year: Number(values.year),
//                     cost: Number(values.cost),
//                   };

//                   const response = await axios.post("http://localhost:3000/library/add-books", payload, {
//                     headers: {
//                       "Content-Type": "application/json",
//                     },
//                   });

//                   if (response.status === 200 || response.status === 201) {
//                     toast.success("Book added successfully!");
//                     resetForm();
//                     navigate('/manage-books');
//                   } else {
//                     toast.error("Something went wrong");
//                   }
//                 } catch (error) {
//                   toast.error("Server error");
//                   console.error("Axios error:", error);
//                 }
//               }}
//             >
//               {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
//                 <Form noValidate onSubmit={handleSubmit} className="form-data">
//                   <Row className="mb-3">
//                     <Col md={4}><Form.Group><Form.Label>Entry Date</Form.Label>
//                       <Form.Control type="date" name="entryDate" value={values.entryDate} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.entryDate && !!errors.entryDate} />
//                       <Form.Control.Feedback type="invalid">{errors.entryDate}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Book Name</Form.Label>
//                       <Form.Control type="text" name="bookName" value={values.bookName} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.bookName && !!errors.bookName} />
//                       <Form.Control.Feedback type="invalid">{errors.bookName}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Title</Form.Label>
//                       <Form.Control type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.title && !!errors.title} />
//                       <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md={4}><Form.Group><Form.Label>Author</Form.Label>
//                       <Form.Control type="text" name="author" value={values.author} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.author && !!errors.author} />
//                       <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Edition</Form.Label>
//                       <Form.Control type="text" name="edition" value={values.edition} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.edition && !!errors.edition} />
//                       <Form.Control.Feedback type="invalid">{errors.edition}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Volume</Form.Label>
//                       <Form.Control type="text" name="volume" value={values.volume} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.volume && !!errors.volume} />
//                       <Form.Control.Feedback type="invalid">{errors.volume}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md={4}><Form.Group><Form.Label>Department</Form.Label>
//                       <Form.Select name="department" value={values.department} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.department && !!errors.department}>
//                         <option value="">Select Department</option>
//                         <option value="Computer Application">Computer Application</option>
//                         <option value="Management">Management</option>
//                         <option value="General">General</option>
//                       </Form.Select>
//                       <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
//                     </Form.Group></Col>

//                     <Col md={4}><Form.Group><Form.Label>Course</Form.Label>
//                       <Form.Select name="course" value={values.course} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.course && !!errors.course}>
//                         <option value="">Select Course</option>
//                         <option value="BCA">BCA</option>
//                         <option value="MCA">MCA</option>
//                         <option value="BBA">BBA</option>
//                         <option value="MBA">MBA</option>
//                         <option value="BCA CTIS">BCA CTIS</option>
//                         <option value="BCA AI">BCA AI</option>
//                       </Form.Select>
//                       <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
//                     </Form.Group></Col>

//                     <Col md={4}><Form.Group><Form.Label>Pages</Form.Label>
//                       <Form.Control type="number" name="pages" value={values.pages} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.pages && !!errors.pages} />
//                       <Form.Control.Feedback type="invalid">{errors.pages}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md={4}><Form.Group><Form.Label>ISBN</Form.Label>
//                       <Form.Control type="text" name="isbn" value={values.isbn} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.isbn && !!errors.isbn} />
//                       <Form.Control.Feedback type="invalid">{errors.isbn}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>No. of Books</Form.Label>
//                       <Form.Control type="number" name="noOfBooks" value={values.noOfBooks} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.noOfBooks && !!errors.noOfBooks} />
//                       <Form.Control.Feedback type="invalid">{errors.noOfBooks}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Rack Number</Form.Label>
//                       <Form.Control type="text" name="rackNumber" value={values.rackNumber} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.rackNumber && !!errors.rackNumber} />
//                       <Form.Control.Feedback type="invalid">{errors.rackNumber}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md={4}><Form.Group><Form.Label>Shelf Number</Form.Label>
//                       <Form.Control type="text" name="shelfNo" value={values.shelfNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.shelfNo && !!errors.shelfNo} />
//                       <Form.Control.Feedback type="invalid">{errors.shelfNo}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Publisher</Form.Label>
//                       <Form.Control type="text" name="publisher" value={values.publisher} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.publisher && !!errors.publisher} />
//                       <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Publish Year</Form.Label>
//                       <Form.Control type="number" name="year" value={values.year} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.year && !!errors.year} />
//                       <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md={4}><Form.Group><Form.Label>Place</Form.Label>
//                       <Form.Control type="text" name="place" value={values.place} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.place && !!errors.place} />
//                       <Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Vendor Name</Form.Label>
//                       <Form.Control type="text" name="vendor" value={values.vendor} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.vendor && !!errors.vendor} />
//                       <Form.Control.Feedback type="invalid">{errors.vendor}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={4}><Form.Group><Form.Label>Bill No</Form.Label>
//                       <Form.Control type="text" name="billNo" value={values.billNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.billNo && !!errors.billNo} />
//                       <Form.Control.Feedback type="invalid">{errors.billNo}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md={6}><Form.Group><Form.Label>Bill Date</Form.Label>
//                       <Form.Control type="date" name="billDate" value={values.billDate} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.billDate && !!errors.billDate} />
//                       <Form.Control.Feedback type="invalid">{errors.billDate}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                     <Col md={6}><Form.Group><Form.Label>Cost on Bill</Form.Label>
//                       <Form.Control type="number" step="0.01" name="cost" value={values.cost} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.cost && !!errors.cost} />
//                       <Form.Control.Feedback type="invalid">{errors.cost}</Form.Control.Feedback>
//                     </Form.Group></Col>
//                   </Row>

//                   <Button type="submit" className="w-100 submit-btn">Add Book</Button>
//                 </Form>
//               )}
//             </Formik>
//           </Card>
//         </Container>
//       </div>
//     </div>
//   );
// };





// 



// import React, { useState } from 'react';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './addNewBook.css';

// const validationSchema = Yup.object().shape({
//   entryDate: Yup.date().required('Entry Date is required'),
//   bookName: Yup.string().required('Book Name is required'),
//   title: Yup.string().required('Title is required'),
//   author: Yup.string().required('Author name is required'),
//   edition: Yup.string().required('Edition is required'),
//   department: Yup.string().required('Department is required'),
//   course: Yup.string().required('Course is required'),
//   pages: Yup.number().min(1).required('Pages required'),
//   isbn: Yup.string().required('ISBN is required'),
//   noOfBooks: Yup.number().min(1).required('Number of books required'),
//   rackNumber: Yup.string().required('Rack number is required'),
//   shelfNo: Yup.string().required('Shelf number is required'),
//   publisher: Yup.string().required('Publisher is required'),
//   year: Yup.number().min(1000).max(new Date().getFullYear()).required('Publisher Year is required'),
//   place: Yup.string().required('Place is required'),
//   vendor: Yup.string().required('Vendor name is required'),
//   billNo: Yup.string().required('Bill No is required'),
//   billDate: Yup.date().required('Bill Date is required'),
//   cost: Yup.number().min(0).required('Cost is required')
// });

// export const AddNewBook = () => {
//   const navigate = useNavigate();

//   const [suggestions, setSuggestions] = useState({
//     author: [],
//     publisher: [],
//     vendor: []
//   });

//   const handleSuggestion = async (field, value, setFieldValue) => {
//     setFieldValue(field, value);
//     if (!value) {
//       setSuggestions((prev) => ({ ...prev, [field]: [] }));
//       return;
//     }
//     try {
//       const res = await axios.get(`http://localhost:3000/library/${field}/search?query=${value}`);
//       setSuggestions((prev) => ({ ...prev, [field]: res.data }));
//     } catch (err) {
//       console.error('Suggestion fetch error:', err.message);
//     }
//   };

//   const handleSelect = (field, name, setFieldValue) => {
//     setFieldValue(field, name);
//     setSuggestions((prev) => ({ ...prev, [field]: [] }));
//   };

//   return (
//     <div className="admin-add-new-book-main-content shrink">
//       <Container className="d-flex justify-content-center align-items-center h-100">
//         <Card className="p-4 add-book-container">
//           <h5 className="text-center fw-bold mb-4 add-book-heading">ADD NEW BOOK</h5>

//           <Formik
//             initialValues={{
//               entryDate: '',
//               bookName: '',
//               title: '',
//               author: '',
//               edition: '',
//               department: '',
//               course: '',
//               pages: '',
//               isbn: '',
//               noOfBooks: '',
//               rackNumber: '',
//               shelfNo: '',
//               publisher: '',
//               year: '',
//               place: '',
//               vendor: '',
//               billNo: '',
//               billDate: '',
//               cost: ''
//             }}
//             validationSchema={validationSchema}
//             onSubmit={async (values, { resetForm }) => {
//               try {
//                 const payload = {
//                   ...values,
//                   pages: Number(values.pages),
//                   noOfBooks: Number(values.noOfBooks),
//                   year: Number(values.year),
//                   cost: Number(values.cost)
//                 };
//                 const res = await axios.post('http://localhost:3000/library/add-books', payload);
//                 if (res.status === 200 || res.status === 201) {
//                   toast.success('Book added successfully!');
//                   resetForm();
//                   navigate('/manage-books');
//                 } else {
//                   toast.error('Something went wrong');
//                 }
//               } catch (error) {
//                 toast.error('Server error');
//               }
//             }}
//           >
//             {({ handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue }) => (
//               <Form noValidate onSubmit={handleSubmit} className="form-data">
//                 <Row className="mb-3">
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Entry Date</Form.Label>
//                       <Form.Control type="date" name="entryDate" value={values.entryDate} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.entryDate && !!errors.entryDate} />
//                       <Form.Control.Feedback type="invalid">{errors.entryDate}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Book Name</Form.Label>
//                       <Form.Control type="text" name="bookName" value={values.bookName} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.bookName && !!errors.bookName} />
//                       <Form.Control.Feedback type="invalid">{errors.bookName}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Title</Form.Label>
//                       <Form.Control type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.title && !!errors.title} />
//                       <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Author</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="author"
//                         value={values.author}
//                         onChange={(e) => handleSuggestion("author", e.target.value, setFieldValue)}
//                         onBlur={handleBlur}
//                         isInvalid={touched.author && !!errors.author}
//                       />
//                       <ul className="suggestion-box">
//                         {suggestions.author.map((a) => (
//                           <li key={a._id} onClick={() => handleSelect("author", a.name, setFieldValue)}>{a.name}</li>
//                         ))}
//                       </ul>
//                       <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Edition</Form.Label>
//                       <Form.Control type="text" name="edition" value={values.edition} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.edition && !!errors.edition} />
//                       <Form.Control.Feedback type="invalid">{errors.edition}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Department</Form.Label>
//                       <Form.Select name="department" value={values.department} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.department && !!errors.department}>
//                         <option value="">Select Department</option>
//                         <option value="Computer Application">Computer Application</option>
//                         <option value="Management">Management</option>
//                         <option value="General">General</option>
//                       </Form.Select>
//                       <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Course</Form.Label>
//                       <Form.Select name="course" value={values.course} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.course && !!errors.course}>
//                         <option value="">Select Course</option>
//                         <option value="BCA">BCA</option>
//                         <option value="MCA">MCA</option>
//                         <option value="BBA">BBA</option>
//                         <option value="MBA">MBA</option>
//                         <option value="BCA CTIS">BCA CTIS</option>
//                         <option value="BCA AI">BCA AI</option>
//                       </Form.Select>
//                       <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Pages</Form.Label>
//                       <Form.Control type="number" name="pages" value={values.pages} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.pages && !!errors.pages} />
//                       <Form.Control.Feedback type="invalid">{errors.pages}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>ISBN</Form.Label>
//                       <Form.Control type="text" name="isbn" value={values.isbn} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.isbn && !!errors.isbn} />
//                       <Form.Control.Feedback type="invalid">{errors.isbn}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={4}>
//                     <Form.Group><Form.Label>No. of Books</Form.Label>
//                       <Form.Control type="number" name="noOfBooks" value={values.noOfBooks} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.noOfBooks && !!errors.noOfBooks} />
//                       <Form.Control.Feedback type="invalid">{errors.noOfBooks}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Rack Number</Form.Label>
//                       <Form.Control type="text" name="rackNumber" value={values.rackNumber} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.rackNumber && !!errors.rackNumber} />
//                       <Form.Control.Feedback type="invalid">{errors.rackNumber}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Shelf Number</Form.Label>
//                       <Form.Control type="text" name="shelfNo" value={values.shelfNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.shelfNo && !!errors.shelfNo} />
//                       <Form.Control.Feedback type="invalid">{errors.shelfNo}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Publisher</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="publisher"
//                         value={values.publisher}
//                         onChange={(e) => handleSuggestion("publisher", e.target.value, setFieldValue)}
//                         onBlur={handleBlur}
//                         isInvalid={touched.publisher && !!errors.publisher}
//                       />
//                       <ul className="suggestion-box">
//                         {suggestions.publisher.map((p) => (
//                           <li key={p._id} onClick={() => handleSelect("publisher", p.name, setFieldValue)}>{p.name}</li>
//                         ))}
//                       </ul>
//                       <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Publish Year</Form.Label>
//                       <Form.Control type="number" name="year" value={values.year} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.year && !!errors.year} />
//                       <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Place</Form.Label>
//                       <Form.Control type="text" name="place" value={values.place} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.place && !!errors.place} />
//                       <Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Vendor</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="vendor"
//                         value={values.vendor}
//                         onChange={(e) => handleSuggestion("vendor", e.target.value, setFieldValue)}
//                         onBlur={handleBlur}
//                         isInvalid={touched.vendor && !!errors.vendor}
//                       />
//                       <ul className="suggestion-box">
//                         {suggestions.vendor.map((v) => (
//                           <li key={v._id} onClick={() => handleSelect("vendor", v.name, setFieldValue)}>{v.name}</li>
//                         ))}
//                       </ul>
//                       <Form.Control.Feedback type="invalid">{errors.vendor}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Bill No</Form.Label>
//                       <Form.Control type="text" name="billNo" value={values.billNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.billNo && !!errors.billNo} />
//                       <Form.Control.Feedback type="invalid">{errors.billNo}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group><Form.Label>Bill Date</Form.Label>
//                       <Form.Control type="date" name="billDate" value={values.billDate} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.billDate && !!errors.billDate} />
//                       <Form.Control.Feedback type="invalid">{errors.billDate}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={12}>
//                     <Form.Group><Form.Label>Cost on Bill</Form.Label>
//                       <Form.Control type="number" step="0.01" name="cost" value={values.cost} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.cost && !!errors.cost} />
//                       <Form.Control.Feedback type="invalid">{errors.cost}</Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Button type="submit" className="w-100 submit-btn">Add Book</Button>
//               </Form>
//             )}
//           </Formik>
//         </Card>
//       </Container>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addNewBook.css';

const validationSchema = Yup.object().shape({
  isbn: Yup.string().required('ISBN is required'),
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author name is required'),
  edition: Yup.string().required('Edition is required'),
  department: Yup.string().required('Department is required'),
  cost:Yup.number().required("Cost is required"),
  course: Yup.string().required('Course is required'),
  pages: Yup.number().min(1).required('Pages required'),
  noOfBooks: Yup.number().min(1).required('Number of books required'),
  rackNumber: Yup.string().required('Rack number is required'),
  shelfNo: Yup.string().required('Shelf number is required'),
  publisher: Yup.string().required('Publisher is required'),
  year: Yup.number().min(1000).max(new Date().getFullYear()).required('Publisher Year is required'),
  place: Yup.string().required('Place is required')
});

export const AddNewBook = () => {
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState({
    title: [],
    author: [],
    publisher: []
  });

  const fetchBookByISBN = async (isbn, setValues) => {
    try {
      const res = await axios.get(`http://localhost:3000/library/book-by-isbn/${isbn}`);
      if (res.data && res.data.book) {
        const book = res.data.book;
        setValues(prev => ({
          ...prev,
          title: book.title || '',
          author: book.author?.name || '',
          edition: book.edition || '',
          department: book.department?.name || '',
          course: book.course?.name || '',
          pages: book.pages || '',
          publisher: book.publisher?.name || '',
          place: book.publisher?.place || '',
          year: book.year || ''
        }));
        toast.info("Existing book found, fields auto-filled");
      }
    } catch (err) {
      console.log("No book found with this ISBN");
    }
  };

  const handleSuggestion = async (field, value, setFieldValue) => {
    setFieldValue(field, value);
    if (!value) {
      setSuggestions(prev => ({ ...prev, [field]: [] }));
      return;
    }
    try {
      const res = await axios.get(`http://localhost:3000/library/${field}/search?query=${value}`);
      setSuggestions(prev => ({ ...prev, [field]: res.data }));
    } catch (err) {
      console.error('Suggestion fetch error:', err.message);
    }
  };

  const handleSelect = (field, name, setFieldValue) => {
    setFieldValue(field, name);
    setSuggestions(prev => ({ ...prev, [field]: [] }));
  };

  return (
    <div className="admin-add-new-book-main-content shrink">
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Card className="p-4 add-book-container">
          <h5 className="text-center fw-bold mb-4 add-book-heading">ADD NEW BOOK</h5>

          <Formik
            initialValues={{
              isbn: '',
              title: '',
              author: '',
              edition: '',
              department: '',
               vendorBill: '',
              course: '',
              cost:'',
              pages: '',
              noOfBooks: '',
              rackNumber: '',
              shelfNo: '',
              publisher: '',
              year: '',
              place: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const payload = {
                ...values,
                pages: Number(values.pages),
                noOfBooks: Number(values.noOfBooks),
                year: Number(values.year)
              };

              try {
                // Store in localStorage
                let tempBooks = JSON.parse(localStorage.getItem("tempBooks")) || [];
                tempBooks.push(payload);
                localStorage.setItem("tempBooks", JSON.stringify(tempBooks));
                toast.success("Book added to review table!");
                resetForm();
                navigate("/review-books");
              } catch (error) {
                toast.error("Failed to save book for review");
              }
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue, setValues }) => (
              <Form noValidate onSubmit={handleSubmit} className="form-data">

                <Row className="mb-3">
                  <Col md={4}><Form.Group><Form.Label>ISBN</Form.Label>
                    <Form.Control
                      type="text"
                      name="isbn"
                      value={values.isbn}
                      onChange={(e) => {
                        handleChange(e);
                        fetchBookByISBN(e.target.value, setValues);
                      }}
                      onBlur={handleBlur}
                      isInvalid={touched.isbn && !!errors.isbn} />
                    <Form.Control.Feedback type="invalid">{errors.isbn}</Form.Control.Feedback>
                  </Form.Group></Col>

                  <Col md={4}><Form.Group><Form.Label>Title</Form.Label>
                    <div className="input-suggestion-wrapper">
                      <Form.Control
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={(e) => handleSuggestion("title", e.target.value, setFieldValue)}
                        onBlur={handleBlur}
                        isInvalid={touched.title && !!errors.title}
                        autoComplete="off"
                      />
                      {suggestions.title.length > 0 && (
                        <ul className="suggestion-box">
                          {suggestions.title.map((t, i) => (
                            <li key={t._id || i} onClick={() => handleSelect("title", t.name || t, setFieldValue)}>
                              {t.name || t}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </div>
                  </Form.Group></Col>

                  <Col md={4}><Form.Group><Form.Label>Author</Form.Label>
                    <div className="input-suggestion-wrapper">
                      <Form.Control
                        type="text"
                        name="author"
                        value={values.author}
                        onChange={(e) => handleSuggestion("author", e.target.value, setFieldValue)}
                        onBlur={handleBlur}
                        isInvalid={touched.author && !!errors.author}
                        autoComplete="off"
                      />
                      {suggestions.author.length > 0 && (
                        <ul className="suggestion-box">
                          {suggestions.author.map((a) => (
                            <li key={a._id} onClick={() => handleSelect("author", a.name, setFieldValue)}>{a.name}</li>
                          ))}
                        </ul>
                      )}
                      <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                    </div>
                  </Form.Group></Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4}><Form.Group><Form.Label>Edition</Form.Label>
                    <Form.Control type="text" name="edition" value={values.edition} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.edition && !!errors.edition} />
                    <Form.Control.Feedback type="invalid">{errors.edition}</Form.Control.Feedback>
                  </Form.Group></Col>

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
                </Row>

                <Row className="mb-3">
                  <Col md={4}><Form.Group><Form.Label>Pages</Form.Label>
                    <Form.Control type="number" name="pages" value={values.pages} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.pages && !!errors.pages} />
                    <Form.Control.Feedback type="invalid">{errors.pages}</Form.Control.Feedback>
                  </Form.Group></Col>

                  <Col md={4}><Form.Group><Form.Label>No. of Books</Form.Label>
                    <Form.Control type="number" name="noOfBooks" value={values.noOfBooks} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.noOfBooks && !!errors.noOfBooks} />
                    <Form.Control.Feedback type="invalid">{errors.noOfBooks}</Form.Control.Feedback>
                  </Form.Group></Col>
                  
                   <Col md={4}><Form.Group><Form.Label>Cost Per Book</Form.Label>
                    <Form.Control type="cost" name="cost" value={values.cost} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.cost && !!errors.cost} />
                    <Form.Control.Feedback type="invalid">{errors.cost}</Form.Control.Feedback>
                  </Form.Group></Col>

                  <Col md={4}><Form.Group><Form.Label>Rack Number</Form.Label>
                    <Form.Control type="text" name="rackNumber" value={values.rackNumber} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.rackNumber && !!errors.rackNumber} />
                    <Form.Control.Feedback type="invalid">{errors.rackNumber}</Form.Control.Feedback>
                  </Form.Group></Col>

                   <Col md={4}><Form.Group><Form.Label>Shelf Number</Form.Label>
                    <Form.Control type="text" name="shelfNo" value={values.shelfNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.shelfNo && !!errors.shelfNo} />
                    <Form.Control.Feedback type="invalid">{errors.shelfNo}</Form.Control.Feedback>
                  </Form.Group></Col>
{/* 
                   <Col md={4}><Form.Group><Form.Label>Shelf Number</Form.Label>
                    <Form.Control type="text" name="shelfNo" value={values.shelfNo} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.shelfNo && !!errors.shelfNo} />
                    <Form.Control.Feedback type="invalid">{errors.shelfNo}</Form.Control.Feedback>
                  </Form.Group></Col> */}

                </Row>

                <Row className="mb-3">
                 

                  <Col md={4}><Form.Group><Form.Label>Publisher</Form.Label>
                    <div className="input-suggestion-wrapper">
                      <Form.Control type="text" name="publisher" value={values.publisher} onChange={(e) => handleSuggestion("publisher", e.target.value, setFieldValue)} onBlur={handleBlur} isInvalid={touched.publisher && !!errors.publisher} autoComplete="off" />
                      {suggestions.publisher.length > 0 && (
                        <ul className="suggestion-box">
                          {suggestions.publisher.map((p) => (
                            <li key={p._id} onClick={() => handleSelect("publisher", p.name, setFieldValue)}>{p.name}</li>
                          ))}
                        </ul>
                      )}
                      <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
                    </div>
                  </Form.Group></Col>

                  <Col md={4}><Form.Group><Form.Label>Publish Year</Form.Label>
                    <Form.Control type="number" name="year" value={values.year} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.year && !!errors.year} />
                    <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                  </Form.Group></Col>

                    <Col md={4}><Form.Group><Form.Label>Place</Form.Label>
                    <Form.Control type="text" name="place" value={values.place} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.place && !!errors.place} />
                    <Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
                  </Form.Group></Col>
                </Row>

                

                <Button type="submit" className="w-100 submit-btn">Add Book</Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </div>
  );
};
