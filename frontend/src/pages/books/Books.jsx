// import { useState } from 'react';
// import { Container, Row, Col, Form } from 'react-bootstrap';

// import { Navbar } from '../../components/navbar/Navbar';

// export const Books = () => {

//   const [filters, setFilters] = useState({
//     search: '',
//     author: '',
//     availability: '',
//     year: '',
//     course: '',
//     semester: '',
//   });

//   return (
//     <>
//       <Navbar />
//       <Container className="mt-5">
//         <div className="mb-4 p-3 border rounded shadow-sm bg-white">
//           <h5 className="mb-3 text-primary">🔍 Filter Books</h5>
//           <Row className="gy-2 gx-3">
//             <Col md={4}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by Book Name"
//                 value={filters.search}
//                 onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//               />
//             </Col>
//             <Col md={4}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by Author"
//                 value={filters.author}
//                 onChange={(e) => setFilters({ ...filters, author: e.target.value })}
//               />
//             </Col>
//             <Col md={4}>
//               <Form.Select
//                 value={filters.availability}
//                 onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
//               >
//                 <option value="">All Availability</option>
//                 <option value="available">Available</option>
//                 <option value="unavailable">Unavailable</option>
//               </Form.Select>
//             </Col>
//             <Col md={3}>
//               <Form.Control
//                 type="number"
//                 placeholder="Year Published"
//                 value={filters.year}
//                 onChange={(e) => setFilters({ ...filters, year: e.target.value })}
//               />
//             </Col>
//             <Col md={3}>
//               <Form.Select
//                 value={filters.course}
//                 onChange={(e) => setFilters({ ...filters, course: e.target.value })}
//               >
//                 <option value="">All Courses</option>
//                 <option value="MCA">MCA</option>
//                 <option value="MBA">MBA</option>
//                 <option value="BCA">BCA</option>
//                 <option value="BBA">BBA</option>
//               </Form.Select>
//             </Col>
//             <Col md={3}>
//               <Form.Select
//                 value={filters.semester}
//                 onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
//               >
//                 <option value="">All Semesters</option>
//                 <option value="1">Semester 1</option>
//                 <option value="2">Semester 2</option>
//                 <option value="3">Semester 3</option>
//                 <option value="4">Semester 4</option>
//                 <option value="5">Semester 5</option>
//                 <option value="6">Semester 6</option>
//               </Form.Select>
//             </Col>
//             <Col md={3}>
//               <Form.Text muted>Filters will apply live on scroll and search.</Form.Text>
//             </Col>
//           </Row>
//         </div>
//       </Container>
//     </>
//   );
// };

import React, { useState } from 'react';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export const Books = () => {
const [filters, setFilters] = useState({
  title: '',
  author: '',
  course: '',
  department: '',
  year: '',
  edition: '',
  rackNo: '',
  shelfNo: '',
  publisher: '',
  availableOnly: false
});

  const [books, setBooks] = useState([]);

  const departments = ['Computer Science', 'Management', 'General'];
  const courses = ['BCA', 'MCA', 'BBA', 'MBA', 'BCA CTIS', 'BCA AI'];

  const handleSearch = async () => {
    try {
      const res = await axios.post("http://localhost:3000/opac/search", filters);
      setBooks(res.data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <Container className="my-5 p-5 rounded shadow bg-light">
      
      <h2 className="text-center mb-4 text-primary fw-bold">📘 Online Public Access Catalog (OPAC)</h2>

      {/* Filters */}
      <Form className="mb-4">
        <Row className="mb-3">
          <Col md={4} className="mb-2">
            <Form.Control
              placeholder="Search by Title"
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            />
          </Col>
          <Col md={4} className="mb-2">
            <Form.Control
              placeholder="Author"
              value={filters.author}
              onChange={(e) => setFilters({ ...filters, author: e.target.value })}
            />
          </Col>
          <Col md={4} className="mb-2">
            <Form.Select
              value={filters.course}
              onChange={(e) => setFilters({ ...filters, course: e.target.value })}
            >
              <option value="">Select Course</option>
              {courses.map((course, idx) => (
                <option key={idx} value={course}>{course}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4} className="mb-2">
            <Form.Select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4} className="mb-2">
            <Form.Control
              type="number"
              placeholder="Year"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            />
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <Form.Check
              label="Only Available"
              checked={filters.availableOnly}
              onChange={(e) => setFilters({ ...filters, availableOnly: e.target.checked })}
            />
          </Col>
          <Col md={4} className="mb-2">
  <Form.Control
    placeholder="Edition"
    value={filters.edition}
    onChange={(e) => setFilters({ ...filters, edition: e.target.value })}
  />
</Col>
<Col md={4} className="mb-2">
  <Form.Control
    placeholder="Rack Number"
    value={filters.rackNo}
    onChange={(e) => setFilters({ ...filters, rackNo: e.target.value })}
  />
</Col>
<Col md={4} className="mb-2">
  <Form.Control
    placeholder="Shelf Number"
    value={filters.shelfNo}
    onChange={(e) => setFilters({ ...filters, shelfNo: e.target.value })}
  />
</Col>
<Col md={4} className="mb-2">
  <Form.Control
    placeholder="Publisher"
    value={filters.publisher}
    onChange={(e) => setFilters({ ...filters, publisher: e.target.value })}
  />
</Col>

        </Row>
        <div className="text-center">
          <Button variant="info" className="px-4 py-2 fw-semibold" onClick={handleSearch}>
            🔍 Search Books
          </Button>
        </div>
      </Form>

      {/* Books Table */}
      {books.length > 0 && (
        <div className="table-responsive mt-4">
          <Table bordered hover className="text-center shadow-sm bg-white">
            <thead className="table-primary">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Course</th>
                <th>Department</th>
                <th>Year</th>
                <th>Edition</th>
                <th>Total Copies</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, idx) => (
                <tr key={idx}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.course}</td>
                  <td>{book.department}</td>
                  <td>{book.year}</td>
                  <td>{book.edition}</td>
                  <td>{book.noOfBooks}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {books.length === 0 && (
        <div className="text-center text-muted mt-4">
          No books to display. Please use the filters above and search.
        </div>
      )}
    </Container>
  );
};
