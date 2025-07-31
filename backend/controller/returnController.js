const Issued = require("../model/issueSchema");
const BookCopie = require("../model/bookCopy"); 
const User = require("../model/User");

exports.returnBook = async (req, res) => {
  try {
    const { accessionNumber, rollNumber } = req.body;

    if (!accessionNumber || !rollNumber) {
      return res.status(400).json({ message: "Accession number and roll number are required." });
    }

    // Find the BookCopy
    const bookCopy = await BookCopie.findOne({ accessionNumber });
    if (!bookCopy) {
      return res.status(404).json({ message: "Book copy not found." });
    }

    // Find the student
    const student = await User.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Find the issued record
    const issuedRecord = await Issued.findOne({
      bookCopy: bookCopy._id,
      user: student._id,
      status: "issued"
    });

    if (!issuedRecord) {
      return res.status(404).json({ message: "No active issued record found for this book and student." });
    }

    const returnDate = new Date();
    const dueDate = new Date(issuedRecord.dueDate);
    const lateDays = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
    const finePerDay = 5;
    const fine = lateDays > 0 ? lateDays * finePerDay : 0;

    issuedRecord.returnDate = returnDate;
    issuedRecord.status = "returned";
    issuedRecord.fine = fine;
    await issuedRecord.save();

    bookCopy.status = "available";
    await bookCopy.save();

    res.status(200).json({
      message: "Book returned successfully",
      fine,
      returnDate,
      studentName: student.userName,
      title: issuedRecord.title,
      accessionNumber
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
