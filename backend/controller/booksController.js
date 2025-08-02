// // controllers/bookController.js

// const Book = require("../model/bookSchema");
// const BookCopie = require("../model/bookCopy");
// const AccessionTracker = require("../model/accessionSchema");

// exports.addBooks = async (req, res) => {
//   try {
//     //  console.log("📦 Request Body:", req.body);
//     const {
//       entryDate, 
//       bookName,
//       title, author, edition, volume,
//       publisher, year, pages, isbn,
//       department, course, cost,
//       rackNumber, shelfNo, place,
//       vendor, billNo, billDate,
//       noOfBooks 
//     } = req.body;

//     // ✅ Step 1: Save book
//     const book = new Book({
//       entryDate,bookName, title, author, edition, volume,
//       publisher, year, pages, isbn,
//       department, course, cost,
//       rackNumber, shelfNo, place,
//       vendor, billNo, billDate,
//       noOfBooks
//     });

//     const savedBook = await book.save();

//     // ✅ Step 2: Get/Create Accession Tracker
//     let tracker = await AccessionTracker.findOne({ course });

//     if (!tracker) {
//       tracker = new AccessionTracker({
//         course,
//         startRange: 1000,
//         current: 999
//       });
//     }

//     // ✅ Step 3: Create multiple Book Copies
//     const copyPromises = [];

//     for (let i = 0; i < noOfBooks; i++) {
//       tracker.current += 1;

//       const copy = new BookCopie({
//         book: savedBook._id,
//         accessionNumber: tracker.current,
//         rackNumber,
//         shelfNo
//       });

//       copyPromises.push(copy.save());
//     }

//     await Promise.all(copyPromises);
//     await tracker.save();

//     // ✅ Success Response
//     res.status(201).json({
//       message: `${noOfBooks} copies added successfully`,
//       bookId: savedBook._id,
//       fromAccession: tracker.current - noOfBooks + 1,
//       toAccession: tracker.current
//     });

//   } catch (err) {
//     console.error("Add Book Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };
    


//add book



// ✅ Book Controller (with accession number logic + search + availability)
const Book=require("../model/bookSchema")
const course=require("../model/courseSchema")

// ✅ CREATE Book (auto accession number + initial status)
exports.createBook = async (req, res) => {
  try {
    const {
      bookName,
      title,
      author,
      edition,
      department,
      course,
      pages,
      isbn,
      noOfBooks,
      rackNumber,
      shelfNumber,
      publisher,
      publishYear,
      vendor,
      billNo,
      billDate,
      costOnBill,
      entryDate
    } = req.body;

    const courseData = await Course.findById(course);
    if (!courseData) return res.status(400).json({ error: "Course not found" });

    const booksToInsert = [];
    let last = courseData.lastAccessionNo;

    for (let i = 0; i < (noOfBooks || 1); i++) {
      last += 1;
      const accessionNumber = courseData.code + String(last).padStart(4, '0');

      booksToInsert.push({
        accessionNumber,
        bookName,
        title,
        author,
        edition,
        department,
        course,
        pages,
        isbn,
        rackNumber,
        shelfNumber,
        publisher,
        publishYear,
        vendor,
        billNo,
        billDate,
        costOnBill,
        entryDate,
        status: "available" // ✅ Initial status
      });
    }

    await Book.insertMany(booksToInsert);
    courseData.lastAccessionNo = last;
    await courseData.save();

    res.status(201).json({ message: "Books added", count: booksToInsert.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ✅ GET All Books (with optional search, filters & status)
exports.getBooks = async (req, res) => {
  try {
    const { keyword, author, department, course, publisher, status } = req.query;

    const filter = {};

    if (keyword) {
      filter.bookName = { $regex: keyword, $options: "i" };
    }
    if (author) filter.author = author;
    if (department) filter.department = department;
    if (course) filter.course = course;
    if (publisher) filter.publisher = publisher;
    if (status) filter.status = status; // ✅ Optional status filter

    const books = await Book.find(filter)
      .populate("author publisher course department vendor")
      .sort({ accessionNumber: 1 });

    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching books" });
  }
};
