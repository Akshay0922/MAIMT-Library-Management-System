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
// const Book = require("../model/bookSchema");
// const Course = require("../model/courseSchema");
// const Vendor = require("../model/vendorSchema");
// const Author = require("../model/authorSchema");
// const Department = require("../model/departmentSchema");
// const Publisher = require("../model/publisherSchema");

// // 🧠 Helper: Get or create doc by name
// const getOrCreateByName = async (Model, name) => {
//   if (!name) return null;
//   const trimmed = name.trim();
//   let doc = await Model.findOne({ name: trimmed });
//   if (!doc) doc = await Model.create({ name: trimmed });
//   return doc._id;
// };

// // ✅ Create Book with auto accession number
// exports.createBook = async (req, res) => {
//   try {
//     const {
//       bookName,
//       title,
//       author,
//       edition,
//       department,
//       course,
//       pages,
//       isbn,
//       noOfBooks,
//       rackNumber,
//       shelfNumber,
//       publisher,
//       publishYear,
//       vendor,
//       billNo,
//       billDate,
//       costOnBill,
//       entryDate
//     } = req.body;

//     // 🔁 Get or create all required references
//     const authorId = await getOrCreateByName(Author, author);
//     const publisherId = await getOrCreateByName(Publisher, publisher);
//     const deptId = await getOrCreateByName(Department, department);
//     const vendorId = await getOrCreateByName(Vendor, vendor);

//     // 📚 Course should already exist (not auto-create)
//     const courseDoc = await Course.findOne({ name: course.trim() });
//     if (!courseDoc) return res.status(400).json({ error: "Course not found" });

//     let last = courseDoc.lastAccessionNo;
//     const booksToInsert = [];

//     for (let i = 0; i < (noOfBooks || 1); i++) {
//       last += 1;
//       const accessionNumber = courseDoc.code + String(last).padStart(4, '0');

//       booksToInsert.push({
//         accessionNumber,
//         bookName,
//         title,
//         author: authorId,
//         edition,
//         department: deptId,
//         course: courseDoc._id,
//         pages,
//         isbn,
//         rackNumber,
//         shelfNumber,
//         publisher: publisherId,
//         publishYear,
//         vendor: vendorId,
//         billNo,
//         billDate,
//         costOnBill,
//         entryDate,
//         status: "available"
//       });
//     }

//     // ✅ Save books and update course tracker
//     await Book.insertMany(booksToInsert);
//     courseDoc.lastAccessionNo = last;
//     await courseDoc.save();

//     res.status(201).json({
//       message: "Books added successfully",
//       count: booksToInsert.length,
//       fromAccession: booksToInsert[0].accessionNumber,
//       toAccession: booksToInsert[booksToInsert.length - 1].accessionNumber
//     });
    
//   } catch (err) {
//     console.error("Book Create Error:", err.message);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// // 🔽 Dropdown: Get Authors
// exports.getAuthors = async (req, res) => {
//   try {
//     const authors = await Author.find({}, 'name');
//     res.json(authors.map(a => a.name));
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch authors" });
//   }
// };

// // 🔽 Dropdown: Get Publishers
// exports.getPublishers = async (req, res) => {
//   try {
//     const publishers = await Publisher.find({}, 'name');
//     res.json(publishers.map(p => p.name));
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch publishers" });
//   }
// };

// // 🔽 Dropdown: Get Vendors
// exports.getVendors = async (req, res) => {
//   try {
//     const vendors = await Vendor.find({}, 'name');
//     res.json(vendors.map(v => v.name));
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch vendors" });
//   }
// };




// ✅ bookController.js — Full Final Version (With Suggestion + Auto Accession)



// const Book = require("../model/bookSchema");
// const Course = require("../model/courseSchema");
// const Vendor = require("../model/vendorSchema");
// const Author = require("../model/authorSchema");
// const Department = require("../model/departmentSchema");
// const Publisher = require("../model/publisherSchema");

// // 🔧 Helper: Generic Reference Getter/Creator (Can return ObjectId or full document)
// const getOrCreateReference = async (Model, input, returnDoc = false) => {
//   if (!input) return null;

//   if (typeof input === 'string' && input.match(/^[0-9a-fA-F]{24}$/)) {
//     const found = await Model.findById(input);
//     return returnDoc ? found : found?._id;
//   }

//   let existing = await Model.findOne({ name: input });
//   if (existing) return returnDoc ? existing : existing._id;

//   const created = await Model.create({ name: input });
//   return returnDoc ? created : created._id;
// };

// // ✅ Add Book Controller
// exports.addBook = async (req, res) => {
//   try {
//     const {
//       entryDate,
//       bookName,
//       title,
//       author,
//       edition,
//       department,
//       course,
//       pages,
//       isbn,
//       noOfBooks,
//       rackNumber,
//       shelfNumber,
//       publisher,
//       publishYear,
//       vendor,
//       billNo,
//       billDate,
//       costOnBill
//     } = req.body;

//     // 🔁 Resolve references
//     const authorId = await getOrCreateReference(Author, author);
//     const publisherId = await getOrCreateReference(Publisher, publisher);
//     const vendorId = await getOrCreateReference(Vendor, vendor);
//     const departmentId = await getOrCreateReference(Department, department);
//     const courseDoc = await getOrCreateReference(Course, course, true);

//     if (!courseDoc) {
//       return res.status(400).json({ message: "Invalid or missing course" });
//     }

//     // 🔢 Accession Number Logic (Auto-increment)
//     courseDoc.lastAccessionNo = courseDoc.lastAccessionNo + 1;
//     await courseDoc.save();
//     const accessionNumber = `${courseDoc.lastAccessionNo}`;

//     // 📘 Create the new Book entry
//     const newBook = await Book.create({
//       accessionNumber,
//       entryDate,
//       bookName,
//       title,
//       author: authorId,
//       edition,
//       department: departmentId,
//       course: courseDoc._id,
//       pages,
//       isbn,
//       noOfBooks,
//       rackNumber,
//       shelfNumber,
//       publisher: publisherId,
//       publishYear,
//       vendor: vendorId,
//       billNo,
//       billDate,
//       costOnBill
//     });

//     res.status(201).json({
//       message: "✅ Book added successfully!",
//       accessionNumber,
//       book: newBook
//     });
//   } catch (err) {
//     console.error("❌ Book add error:", err.message);
//     res.status(500).json({ message: "Error adding book", error: err.message });
//   }
// };



// // ✅ Suggestion Controller for Autocomplete Dropdown
// const searchByName = async (Model, req, res) => {
//   try {
//     const query = req.query.query || "";
//     const results = await Model.find({
//       name: { $regex: new RegExp("^" + query, "i") }
//     }).limit(10);
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // 🔎 Export All Suggestion Handlers
// exports.searchAuthors = (req, res) => searchByName(Author, req, res);
// exports.searchPublishers = (req, res) => searchByName(Publisher, req, res);
// exports.searchVendors = (req, res) => searchByName(Vendor, req, res);
// exports.searchCourses = (req, res) => searchByName(Course, req, res);
// exports.searchDepartments = (req, res) => searchByName(Department, req, res);




const Book = require("../model/bookSchema");
const Course = require("../model/courseSchema");
const Vendor = require("../model/vendorSchema");
const Author = require("../model/Author");
const Department = require("../model/departmentSchema");
const Publisher = require("../model/publisherSchema");

// 🔧 Helper: Generic Reference Getter/Creator
const getOrCreateReference = async (Model, input, returnDoc = false) => {
  if (!input) return null;

  if (typeof input === 'string' && input.match(/^[0-9a-fA-F]{24}$/)) {
    const found = await Model.findById(input);
    return returnDoc ? found : found?._id;
  }

  let existing = await Model.findOne({ name: input });
  if (existing) return returnDoc ? existing : existing._id;

  const created = await Model.create({ name: input });
  return returnDoc ? created : created._id;
};

// ✅ Add Book Controller
exports.addBook = async (req, res) => {
  try {
    const {
      entryDate,
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
      shelfNo,
      publisher,
      year,
      place,
      vendor,
      billNo,
      billDate,
      cost
    } = req.body;

    // 🔁 Resolve references
    const authorId = await getOrCreateReference(Author, author);
    const publisherId = await getOrCreateReference(Publisher, publisher);
    const vendorId = await getOrCreateReference(Vendor, vendor);
    const departmentId = await getOrCreateReference(Department, department);

    const updatedCourseDoc = await Course.findOneAndUpdate(
      { name: course },
      { $inc: { lastAccessionNo: 1 } },
      { new: true, upsert: true }
    );

    if (!updatedCourseDoc) {
      return res.status(400).json({ message: "Invalid or missing course" });
    }

    const accessionNumber = `${updatedCourseDoc.lastAccessionNo}`;

    const newBook = await Book.create({
      accessionNumber,
      entryDate,
      bookName,
      title,
      author: authorId,
      edition,
      department: departmentId,
      course: updatedCourseDoc._id,
      pages,
      isbn,
      noOfBooks,
      rackNumber,
      shelfNo,
      publisher: publisherId,
      year,
      place,
      vendor: vendorId,
      billNo,
      billDate,
      cost
    });

    res.status(201).json({
      message: "✅ Book added successfully!",
      accessionNumber,
      book: newBook
    });
  } catch (err) {
    console.error("❌ Book add error:", err.message);
    res.status(500).json({ message: "Error adding book", error: err.message });
  }
};

// ✅ Suggestion Controller for Autocomplete Dropdown
const searchByName = async (Model, req, res) => {
  try {
    const query = req.query.query || "";
    const results = await Model.find({
      name: { $regex: new RegExp("^" + query, "i") }
    }).limit(10);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔎 Export All Suggestion Handlers
exports.searchAuthors = (req, res) => searchByName(Author, req, res);
exports.searchPublishers = (req, res) => searchByName(Publisher, req, res);
exports.searchVendors = (req, res) => searchByName(Vendor, req, res);
exports.searchCourses = (req, res) => searchByName(Course, req, res);
exports.searchDepartments = (req, res) => searchByName(Department, req, res);
