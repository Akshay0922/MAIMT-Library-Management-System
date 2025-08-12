// // POST /library/issue

// const User = require('../model/User'); 
// const BookVolume = require('../model/BookVolume');
// const Issue = require('../model/IssueSchema'); 

// exports.issueBook = async (req, res) => {
//   try {
//     const { rollNo, title, accessionNo, dueDate } = req.body;

//     //  Step 1: Find user by roll number
//     const user = await User.findOne({ rollNumber:rollNo });
//     if (!user) return res.status(404).json({ message: 'Student not found' });

//     //  Step 2: Find book by title
//     const book = await BookVolume.findOne({ title });
//     if (!book) return res.status(404).json({ message: 'Book not found' });

//     //  Step 3: Find specific copy with given accessionNo
//     const copy = book.copies.find(c => c.accessionNo === accessionNo);
//     if (!copy) return res.status(404).json({ message: 'Copy not found' });

//     //  Already issued?
//     if (copy.status !== 'available') {
//       return res.status(400).json({ message: 'Copy is not available' });
//     }

//     const alreadyIssued = await Issue.findOne({
//       accessionNo,
//       status: 'issued'
//     });

//     if (alreadyIssued) {
//       return res.status(400).json({ message: 'This book is already issued' });
//     }

//     //  Set due date: 3 months from now if not provided
//     const finalDueDate = dueDate ? new Date(dueDate) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

//     //  Step 4: Create issue record
//     const issue = await Issue.create({
//       user: user._id,
//       book: book._id,
//       accessionNo,
//       dueDate: finalDueDate,
//       status: 'issued'
//     });

//     //  Step 5: Mark copy as issued
//     copy.status = 'issued';
//     await book.save();

//     return res.status(201).json({
//       message: ' Book issued successfully',
//       issue
//     });

//   } catch (err) {
//     console.error(' Error issuing book:', err);
//     return res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // POST /library/info
// // POST /library/info
// exports.getStudentAndBookInfo = async (req, res) => {
//   try {
//     const { rollNo, accessionNo } = req.body;

//     // 🧑 Step 1: Get user by roll number
//     const user = await User.findOne({ rollNumber: rollNo });
//     if (!user) return res.status(404).json({ message: 'Student not found' });

//     // 📚 Step 2: Find BookVolume that contains this accessionNo & is available
//     const book = await BookVolume.findOne({
//       copies: {
//         $elemMatch: {
//           accessionNo: Number(accessionNo),
//           status: 'available'
//         }
//       }
//     }).select('title author copies').populate('author');

//     if (!book) return res.status(404).json({ message: 'Available book not found for this accession number' });

//     // 🔍 Find the exact copy inside the book
//     const matchingCopy = book.copies.find(c => c.accessionNo === Number(accessionNo));

//     return res.status(200).json({
//       studentName: user.userName,
//       department: user.course || user.department || '', // ✅ Either from 'course' or 'department' field
//       title: book.title,
//       author: book.author.name,
//       accessionNo: matchingCopy.accessionNo,
//       dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // default due date to return
//     });

//   } catch (err) {
//     console.error(' Error fetching info:', err);
//     return res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };
// 📁 controllers/libraryController.js
const User = require('../model/User');
const BookVolume = require('../model/BookVolume');
const Issue = require('../model/issueSchema');


exports.issueBook = async (req, res) => {
  try {
    const { rollNo, title, accessionNo, dueDate } = req.body;

    if (!rollNo || !title || !accessionNo || !dueDate) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    // 1️⃣ Student find karo roll number se
    const user = await User.findOne({ rollNumber: rollNo });
    if (!user) {
      return res.status(404).json({ message: "❌ Student not found" });
    }

    // 2️⃣ Book find karo title se (case-insensitive)
    const book = await BookVolume.findOne({
      title: new RegExp(`^${title}$`, "i"),
    });
    if (!book) {
      return res.status(404).json({ message: "❌ Book not found" });
    }

    // 3️⃣ Specific copy find karo accession number se
    const copy = book.copies.find(
      (c) => c.accessionNo === Number(accessionNo)
    );
    if (!copy) {
      return res.status(404).json({ message: "❌ Copy not found" });
    }

    // 4️⃣ Check copy available hai ya nahi
    if (copy.status !== "available") {
      return res
        .status(400)
        .json({ message: "❌ This copy is already issued/lost/damaged" });
    }

    // 5️⃣ Check agar ye accession no pehle se issue hai
    const alreadyIssued = await Issue.findOne({
      accessionNo: Number(accessionNo),
      status: "issued",
    });
    if (alreadyIssued) {
      return res.status(400).json({ message: "❌ This book is already issued" });
    }

    // 6️⃣ Create issue record
    const newIssue = await Issue.create({
      user: user._id, // yahan tumhara custom _id bhi chalega kyunki mongoose type change karega
      book: book._id,
      accessionNo: Number(accessionNo),
      dueDate: new Date(dueDate),
      status: "issued",
    });

    // 7️⃣ Update copy status
    copy.status = "issued";
    await book.save();

    return res.status(201).json({
      message: "✅ Book issued successfully!",
      issue: newIssue,
    });
  } catch (err) {
    console.error("❌ Server Error:", err);
    return res
      .status(500)
      .json({ message: "❌ Internal Server Error", error: err.message });
  }
};
