// const Issued = require("../model/issueSchema");
// const BookCopie = require("../model/bookCopy"); // 👈 correct model name based on "bookCopie"
// const User = require("../model/User");

// exports.issueBook = async (req, res) => {
//   try {
//     const { accessionNumber, rollNumber } = req.body;

//     if (!accessionNumber || !rollNumber) {
//       return res.status(400).json({ message: "Accession number and roll number are required." });
//     }

//     const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
//     if (!bookCopy) {
//       return res.status(404).json({ message: "Book copy not found." });
//     }

//     if (bookCopy.status === "issued") {
//       return res.status(400).json({ message: "This book is already issued." });
//     }

//     const student = await User.findOne({ rollNumber });
//     if (!student) {
//       return res.status(404).json({ message: "Student with this roll number not found." });
//     }

//     const issueDate = new Date();
//     const dueDate = new Date();
//     dueDate.setDate(issueDate.getDate() + 14);

//     const issued = await Issued.create({
//       book: bookCopy.book._id,
//       bookCopy: bookCopy._id,
//       user: student._id,
//       issueDate,
//       dueDate,
//       status: "issued",
//       fine: 0
//     });

//     bookCopy.status = "issued";
//     await bookCopy.save();

//     res.status(201).json({
//       message: "Book issued successfully.",
//       title: bookCopy.book.title,
//       accessionNumber: bookCopy.accessionNumber,
//       studentName: student.userName,
//       course: student.course,
//       rollNumber: student.rollNumber,
//       dueDate
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



// const Issued = require("../model/issueSchema");
// const BookCopie = require("../model/bookCopy");
// const User = require("../model/User");

// exports.issueBook = async (req, res) => {
//   try {
//     const { accessionNumber, rollNumber } = req.body;

//     if (!accessionNumber || !rollNumber) {
//       return res.status(400).json({ message: "Accession number and roll number are required." });
//     }

//     const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
//     if (!bookCopy) {
//       return res.status(404).json({ message: "Book copy not found." });
//     }

  
//     if (bookCopy.status === "issued") {
//       return res.status(400).json({ message: "This book is already issued." });
//     }

//     const student = await User.findOne({ rollNumber });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found with this roll number." });
//     }

 
//     const issued = await Issued.create({
//       bookCopy: bookCopy._id,
//       user: student._id, 
//       issueDate: new Date(), 
//       status: "issued",
//       fine: 0
//     });

   
//     bookCopy.status = "issued";
//     await bookCopy.save();

//     res.status(201).json({
//       message: "Book issued successfully!",
//       data: {
//         studentName: student.userName,
//         rollNumber: student.rollNumber,
//         course: student.course,
//         accessionNumber: bookCopy.accessionNumber,
//         title: bookCopy.book.title,
//         author: bookCopy.book.author,
//         issueDate: issued.issueDate.toDateString()
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ message: "❌ Server error", error: error.message });
//   }
// };



const Issued = require("../model/issueSchema");
const BookCopie = require("../model/bookCopy");
const User = require("../model/User");

// 🎯 1. FETCH for autofill
exports.fetchBookAndStudent = async (req, res) => {
  try {
    const { rollNumber, accessionNumber } = req.body;

    if (!rollNumber || !accessionNumber) {
      return res.status(400).json({ message: "Both roll number and accession number are required" });
    }

    const student = await User.findOne({ rollNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
    if (!bookCopy) return res.status(404).json({ message: "Book not found" });

    return res.status(200).json({
      studentName: student.userName,
      department: student.course,
      title: bookCopy.book.title,
      dueDate: bookCopy.dueDate || null,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🎯 2. Issue book on form submit
exports.issueBook = async (req, res) => {
  try {
    const { accessionNumber, rollNumber } = req.body;

    if (!accessionNumber || !rollNumber) {
      return res.status(400).json({ message: "Accession number and roll number are required." });
    }

    const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
    if (!bookCopy) return res.status(404).json({ message: "Book copy not found." });

    if (bookCopy.status === "issued") {
      return res.status(400).json({ message: "This book is already issued." });
    }

    const student = await User.findOne({ rollNumber });
    if (!student) return res.status(404).json({ message: "Student not found." });

    const issued = await Issued.create({
      bookCopy: bookCopy._id,
      user: student._id,
      issueDate: new Date(),
      status: "issued",
      fine: 0
    });

    bookCopy.status = "issued";
    await bookCopy.save();

    res.status(201).json({ message: "Book issued successfully!" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

