// // const Issued = require("../model/issueSchema");
// // const BookCopie = require("../model/bookCopy"); // 👈 correct model name based on "bookCopie"
// // const User = require("../model/User");

// // exports.issueBook = async (req, res) => {
// //   try {
// //     const { accessionNumber, rollNumber } = req.body;

// //     if (!accessionNumber || !rollNumber) {
// //       return res.status(400).json({ message: "Accession number and roll number are required." });
// //     }

// //     const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
// //     if (!bookCopy) {
// //       return res.status(404).json({ message: "Book copy not found." });
// //     }

// //     if (bookCopy.status === "issued") {
// //       return res.status(400).json({ message: "This book is already issued." });
// //     }

// //     const student = await User.findOne({ rollNumber });
// //     if (!student) {
// //       return res.status(404).json({ message: "Student with this roll number not found." });
// //     }

// //     const issueDate = new Date();
// //     const dueDate = new Date();
// //     dueDate.setDate(issueDate.getDate() + 14);

// //     const issued = await Issued.create({
// //       book: bookCopy.book._id,
// //       bookCopy: bookCopy._id,
// //       user: student._id,
// //       issueDate,
// //       dueDate,
// //       status: "issued",
// //       fine: 0
// //     });

// //     bookCopy.status = "issued";
// //     await bookCopy.save();

// //     res.status(201).json({
// //       message: "Book issued successfully.",
// //       title: bookCopy.book.title,
// //       accessionNumber: bookCopy.accessionNumber,
// //       studentName: student.userName,
// //       course: student.course,
// //       rollNumber: student.rollNumber,
// //       dueDate
// //     });

// //   } catch (error) {
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };



// // const Issued = require("../model/issueSchema");
// // const BookCopie = require("../model/bookCopy");
// // const User = require("../model/User");

// // exports.issueBook = async (req, res) => {
// //   try {
// //     const { accessionNumber, rollNumber } = req.body;

// //     if (!accessionNumber || !rollNumber) {
// //       return res.status(400).json({ message: "Accession number and roll number are required." });
// //     }

// //     const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
// //     if (!bookCopy) {
// //       return res.status(404).json({ message: "Book copy not found." });
// //     }

  
// //     if (bookCopy.status === "issued") {
// //       return res.status(400).json({ message: "This book is already issued." });
// //     }

// //     const student = await User.findOne({ rollNumber });
// //     if (!student) {
// //       return res.status(404).json({ message: "Student not found with this roll number." });
// //     }

 
// //     const issued = await Issued.create({
// //       bookCopy: bookCopy._id,
// //       user: student._id, 
// //       issueDate: new Date(), 
// //       status: "issued",
// //       fine: 0
// //     });

   
// //     bookCopy.status = "issued";
// //     await bookCopy.save();

// //     res.status(201).json({
// //       message: "Book issued successfully!",
// //       data: {
// //         studentName: student.userName,
// //         rollNumber: student.rollNumber,
// //         course: student.course,
// //         accessionNumber: bookCopy.accessionNumber,
// //         title: bookCopy.book.title,
// //         author: bookCopy.book.author,
// //         issueDate: issued.issueDate.toDateString()
// //       }
// //     });

// //   } catch (error) {
// //     res.status(500).json({ message: "❌ Server error", error: error.message });
// //   }
// // };



// const Issued = require("../model/issueSchema");
// const BookCopie = require("../model/bookCopy");
// const User = require("../model/User");

// // 🎯 1. FETCH for autofill
// exports.fetchBookAndStudent = async (req, res) => {
//   try {
//     const { rollNumber, accessionNumber } = req.body;

//     if (!rollNumber || !accessionNumber) {
//       return res.status(400).json({ message: "Both roll number and accession number are required" });
//     }

//     const student = await User.findOne({ rollNumber });
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
//     if (!bookCopy) return res.status(404).json({ message: "Book not found" });

//     return res.status(200).json({
//       studentName: student.userName,
//       department: student.course,
//       title: bookCopy.book.title,
//       dueDate: bookCopy.dueDate || null,
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
<<<<<<< HEAD
// 📁 controllers/libraryController.js
const User = require('../model/User');
const BookVolume = require('../model/BookVolume');
const Issue = require('../model/IssueSchema');
=======

// // 🎯 2. Issue book on form submit
// exports.issueBook = async (req, res) => {
//   try {
//     const { accessionNumber, rollNumber } = req.body;
>>>>>>> parent of 698e6e5 (.)

//     if (!accessionNumber || !rollNumber) {
//       return res.status(400).json({ message: "Accession number and roll number are required." });
//     }

<<<<<<< HEAD
    // 🔍 Step 1: Check user
    const user = await User.findOne({ rollNumber: rollNo });
    if (!user) return res.status(404).json({ message: '❌ Student not found' });

    // 🔍 Step 2: Book case-insensitive search
    const book = await BookVolume.findOne({
      title: new RegExp(`^${title}$`, 'i')  // 'dbms' == 'DBMS' etc.
    });
    if (!book) return res.status(404).json({ message: '❌ Book not found' });

    // 🔍 Step 3: Find specific copy
    const copy = book.copies.find(c => c.accessionNo === Number(accessionNo));
    if (!copy) return res.status(404).json({ message: '❌ Copy not found' });

    if (copy.status !== 'available') {
      return res.status(400).json({ message: '❌ Copy is already issued/lost/damaged' });
    }

    // 🛑 Check already issued
    const alreadyIssued = await Issue.findOne({ accessionNo: Number(accessionNo), status: 'issued' });
    if (alreadyIssued) {
      return res.status(400).json({ message: '❌ This book is already issued' });
    }

    // 📅 Due Date
    const finalDueDate = dueDate ? new Date(dueDate) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    // ✅ Create Issue
    const issue = await Issue.create({
      user: user._id,
      book: book._id,
      accessionNo: Number(accessionNo),
      dueDate: finalDueDate,
      status: 'issued'
    });

    // 🟢 Update copy status
    copy.status = 'issued';
    await book.save();

    return res.status(201).json({
      message: '✅ Book issued successfully!',
      issue
    });

  } catch (err) {
    console.error('❌ Server Error:', err);
    return res.status(500).json({ message: '❌ Internal Server Error', error: err.message });
  }
};
=======
//     const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
//     if (!bookCopy) return res.status(404).json({ message: "Book copy not found." });

//     if (bookCopy.status === "issued") {
//       return res.status(400).json({ message: "This book is already issued." });
//     }

//     const student = await User.findOne({ rollNumber });
//     if (!student) return res.status(404).json({ message: "Student not found." });

//     const issued = await Issued.create({
//       bookCopy: bookCopy._id,
//       user: student._id,
//       issueDate: new Date(),
//       status: "issued",
//       fine: 0
//     });

//     bookCopy.status = "issued";
//     await bookCopy.save();

//     res.status(201).json({ message: "Book issued successfully!" });

//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

>>>>>>> parent of 698e6e5 (.)
