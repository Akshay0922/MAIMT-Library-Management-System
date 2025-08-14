import { useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import SearchBooksImage from '../../assets/searchBooksImage.png';
import Ball from "../../assets/ball.png";

import './books.css';

export const Books = () => {
  const [books, setBooks] = useState([]);

  const departments = ['Computer Science', 'Management', 'General'];
  const courses = ['BCA', 'MCA', 'BBA', 'MBA', 'BCA CTIS', 'BCA AI'];

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      course: '',
      department: '',
      year: '',
      edition: '',
      rackNo: '',
      shelfNo: '',
      publisher: '',
      availableOnly: '',
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      author: Yup.string(),
      course: Yup.string(),
      department: Yup.string(),
      year: Yup.number().typeError('Year must be a number'),
      edition: Yup.string(),
      rackNo: Yup.string(),
      shelfNo: Yup.string(),
      publisher: Yup.string(),
      availableOnly: Yup.string().oneOf(['available', 'not-available'], 'Select valid option'),
    }),
    onSubmit: async (values) => {
      const filters = {
        ...values,
        availableOnly: values.availableOnly === 'available',
      };

      try {
        const res = await axios.post("http://localhost:3000/opac/search", filters);
        setBooks(res.data);
      } catch (err) {
        console.error("Search failed", err);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="books-page-top-part">
        <img className="home-ball" src={Ball} alt="Ball" />
        <div className="top-content">
          <div className="text-block">
            <h1>Search in</h1>
            <h2>MAIMT Library</h2>
            <p>Find the books you need with ease and speed.</p>
          </div>
          <div className="image-block">
            <img src={SearchBooksImage} alt='Search Books' className='search-books-image' />
          </div>
        </div>
      </div>

      <div className="books-page">
        <h1 className='books-page-heading'> Search Books</h1>
        <form onSubmit={formik.handleSubmit} className="book-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" onChange={formik.handleChange} value={formik.values.title} />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input type="text" name="author" onChange={formik.handleChange} value={formik.values.author} />
            </div>

            <div className="form-group">
              <label>Course</label>
              <select name="course" onChange={formik.handleChange} value={formik.values.course}>
                <option value="">Select Course</option>
                {courses.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select name="department" onChange={formik.handleChange} value={formik.values.department}>
                <option value="">Select Department</option>
                {departments.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Year</label>
              <input type="number" name="year" onChange={formik.handleChange} value={formik.values.year} />
            </div>

            <div className="form-group">
              <label>Availability</label>
              <select name="availableOnly" onChange={formik.handleChange} value={formik.values.availableOnly}>
                <option value="">Select</option>
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
            </div>

            <div className="form-group">
              <label>Edition</label>
              <input type="text" name="edition" onChange={formik.handleChange} value={formik.values.edition} />
            </div>

            <div className="form-group">
              <label>Rack No</label>
              <input type="text" name="rackNo" onChange={formik.handleChange} value={formik.values.rackNo} />
            </div>

            <div className="form-group">
              <label>Shelf No</label>
              <input type="text" name="shelfNo" onChange={formik.handleChange} value={formik.values.shelfNo} />
            </div>

            <div className="form-group">
              <label>Publisher</label>
              <input type="text" name="publisher" onChange={formik.handleChange} value={formik.values.publisher} />
            </div>
          </div>

          <div className="btn-container">
            <button type="submit" className="search-btn">Search Books</button>
          </div>




          {books.length > 0 ? (
            <div className="table-wrapper">
              <table className="books-table">
                <thead>
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
              </table>
            </div>
          ) : (
            <div className="no-books-msg">No books to display. Please use the filters above and search.</div>
          )}
        </form>
      </div>
    </>
  );
};