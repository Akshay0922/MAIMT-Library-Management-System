import React, { useEffect, useState } from "react";
import { Button, Table, Container, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const BookReviewPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessionMap, setAccessionMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("tempBooks")) || [];
    setBooks(local);

    const fetchAccessions = async () => {
      const courseSet = new Set(local.map((b) => b.course));
      const tempMap = {};

      for (let course of courseSet) {
        try {
          const res = await fetch(`http://localhost:3000/library/get-last-accession?course=${encodeURIComponent(course)}`);
          if (!res.ok) throw new Error(`API error for course: ${course}`);
          const data = await res.json();
          tempMap[course] = data.lastAccessionNo;
        } catch (err) {
          console.error(`❌ Could not fetch accession for ${course}:`, err.message);
          tempMap[course] = 0;
        }
      }

      setAccessionMap(tempMap);
    };

    if (local.length > 0) fetchAccessions();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedBooks = [...books];
    updatedBooks[index][field] = value;
    setBooks(updatedBooks);
    localStorage.setItem("tempBooks", JSON.stringify(updatedBooks));
  };

  const handleDelete = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
    localStorage.setItem("tempBooks", JSON.stringify(updated));
    toast.success("🗑️ Book deleted.");
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    const failedBooks = [];

    for (let book of books) {
      if (!book.author?.trim() || !book.publisher?.trim() || !book.title?.trim() || !book.isbn?.trim()) {
        toast.warn(`❗ Book "${book.title || "Untitled"}" skipped: missing required fields.`);
        continue;
      }

      try {
        const formattedBook = {
          title: book.title.trim(),
          isbn: book.isbn.trim(),
          edition: book.edition,
          pages: Number(book.pages),
          author: { name: book.author.trim() },
          publisher: { name: book.publisher.trim(), place: book.place?.trim() || "" },
          department: { name: book.department.trim() },
          course: { name: book.course.trim() },
          noOfBooks: Number(book.noOfBooks),
          rackNo: book.rackNumber,
          shelfNo: book.shelfNo,
          cost: Number(book.cost) || 0,
        };

        const res = await fetch("http://localhost:3000/library/add-books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedBook),
        });

        if (!res.ok) {
          const errorRes = await res.json();
          console.error("❌ Failed book:", book);
          console.error("📋 Reason:", errorRes);
          failedBooks.push(book);
        }
      } catch (err) {
        console.error("❌ Network error:", err.message);
        failedBooks.push(book);
      }
    }

    setLoading(false);

    if (failedBooks.length === 0) {
      toast.success("✅ All books saved successfully!");
      localStorage.removeItem("tempBooks");
      navigate("/manage-books");
    } else {
      toast.error(`${failedBooks.length} book(s) failed to save. Check console for details.`);
    }
  };

  return (
    <Container className="mt-5">
      <h4 className="text-center mb-4">📚 Review & Edit Books Before Saving</h4>
      {books.length === 0 ? (
        <p className="text-center">No books added yet.</p>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover responsive style={{ minWidth: "1800px" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Edition</th>
                  <th>Dept</th>
                  <th>Accession Number</th>
                  <th>Course</th>
                  <th>Pages</th>
                  <th>Rack</th>
                  <th>Shelf</th>
                  <th>Publisher</th>
                  <th>Place</th>
                  <th>Year</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.flatMap((b, i) => {
                  let startAccNo = (accessionMap[b.course] || 0) + 1;
                  return [...Array(Number(b.noOfBooks) || 0)].map((_, idx) => (
                    <tr key={`${i}-${idx}`}>
                      <td>{i + 1}.{idx + 1}</td>
                      <td><Form.Control value={b.isbn} onChange={(e) => handleInputChange(i, "isbn", e.target.value)} /></td>
                      <td><Form.Control value={b.title} onChange={(e) => handleInputChange(i, "title", e.target.value)} /></td>
                      <td><Form.Control value={b.author} onChange={(e) => handleInputChange(i, "author", e.target.value)} /></td>
                      <td><Form.Control value={b.edition} onChange={(e) => handleInputChange(i, "edition", e.target.value)} /></td>
                      <td><Form.Control value={b.department} onChange={(e) => handleInputChange(i, "department", e.target.value)} /></td>
                      <td>{startAccNo + idx}</td>
                      <td><Form.Control value={b.course} onChange={(e) => handleInputChange(i, "course", e.target.value)} /></td>
                      <td><Form.Control value={b.pages} onChange={(e) => handleInputChange(i, "pages", e.target.value)} /></td>
                      <td><Form.Control value={b.rackNumber} onChange={(e) => handleInputChange(i, "rackNumber", e.target.value)} /></td>
                      <td><Form.Control value={b.shelfNo} onChange={(e) => handleInputChange(i, "shelfNo", e.target.value)} /></td>
                      <td><Form.Control value={b.publisher} onChange={(e) => handleInputChange(i, "publisher", e.target.value)} /></td>
                      <td><Form.Control value={b.place} onChange={(e) => handleInputChange(i, "place", e.target.value)} /></td>
                      <td><Form.Control value={b.year} onChange={(e) => handleInputChange(i, "year", e.target.value)} /></td>
                      <td><Form.Control value={b.cost} onChange={(e) => handleInputChange(i, "cost", e.target.value)} /></td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(i)}>Delete</Button>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={handleFinalSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Saving...
                </>
              ) : (
                "✅ Final Submit to DB"
              )}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};
