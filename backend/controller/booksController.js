// controllers/bookController.js
const BookVolume = require('../model/BookVolume');
const Course = require('../model/Course');
const Vendor = require('../model/Vendor');
const VendorBill = require('../model/VendorBill');
const Author = require('../model/Author');
const Publisher = require('../model/Publisher');
const Department = require('../model/Department');

// exports.addBookVolume = async (req, res) => {
//   try {
//     const {
//       title,
//       edition,
//       isbn,
//       pages,
//       departmentName,
//       courseName,
//       authorName,
//       publisherName,
//       publisherPlace,
//       vendorName,
//       billNo,
//       billDate,
//       costPerCopy,
     
//       rackNo,
//       shelfNo
//     } = req.body;

   
//     let author = await Author.findOne({ name: authorName });
//     if (!author) {
//       author = await Author.create({ name: authorName });
//     }

    
//     let publisher = await Publisher.findOne({ name: publisherName });
//     if (!publisher) {
//       publisher = await Publisher.create({ name: publisherName, place: publisherPlace });
//     }

//     let department = await Department.findOne({ name: departmentName });
//     if (!department) {
//       department = await Department.create({ name: departmentName });
//     }
 
//     let course = await Course.findOne({ name: courseName, department: department._id });
//     if (!course) {
//       course = await Course.create({ name: courseName, department: department._id, lastAccessionNo: 0 });
//     }

    
//     let vendor = await Vendor.findOne({ name: vendorName });
//     if (!vendor) {
//       vendor = await Vendor.create({ name: vendorName });
//     }

    
//     let vendorBill = await VendorBill.findOne({ vendor: vendor._id, billNo });
//     if (!vendorBill) {
//       vendorBill = await VendorBill.create({
//         vendor: vendor._id,
//         billNo,
//         billDate,
//         costPerCopy
//       });
//     }

    
//     let bookVolume = await BookVolume.findOne({
//       title,
//       edition,
//       author: author._id,
//       publisher: publisher._id,
//       course: course._id
//     });

//     let newCopies = [];
// const copiesFromReq = req.body.copies; // Array of copies
// const numberOfCopies = copiesFromReq.length;

// for (let i = 0; i < numberOfCopies; i++) {
//   const singleCopy = copiesFromReq[i];

//   let accessionNumber;
//   if (singleCopy.accessionNo) {
//     accessionNumber = singleCopy.accessionNo;
//   } else {
//     course.lastAccessionNo += 1;
//     accessionNumber = course.lastAccessionNo;
//   }

//   newCopies.push({
//     accessionNo: accessionNumber,
//     rackNo: singleCopy.rackNo,
//     shelfNo: singleCopy.shelfNo,
//     cost: costPerCopy,
//     vendorBill: vendorBill._id,
//     status: 'available',
//     entryDate: new Date()
//   });
// }

// await course.save();


    
//     if (bookVolume) {
//       bookVolume.copies.push(...newCopies);
//       await bookVolume.save();

//       return res.status(200).json({
//         message: 'Copies added to existing book volume',
//         bookVolume
//       });
//     } else {
//       const newBookVolume = await BookVolume.create({
//         title,
//         edition,
//         isbn,
//         pages,
//         author: author._id,
//         publisher: publisher._id,
//         department: department._id,
//         course: course._id,
//         vendorBill: vendorBill._id,
//         copies: newCopies
//       });

//       return res.status(201).json({
//         message: 'New book volume created',
//         bookVolume: newBookVolume
//       });
//     }
//   } catch (error) {
//     console.error('Error in addBookVolume:', error);
//     return res.status(500).json({
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };



// exports.addBookVolume = async (req, res) => {
//   try {
//     const {
//       title,
//       edition,
//       isbn,
//       pages,
//       departmentName,
//       courseName,
//       authorName,
//       publisherName,
//       publisherPlace,
//       vendor, // <- vendor object from VendorForm
//       billNo,
//       billDate,
//       cost, // <- cost from VendorForm
//       copies // <- all copies with rack/shelf info
//     } = req.body;

//     // Author
//     let author = await Author.findOne({ name: authorName });
//     if (!author) author = await Author.create({ name: authorName });

//     // Publisher
//     let publisher = await Publisher.findOne({ name: publisherName });
//     if (!publisher) publisher = await Publisher.create({ name: publisherName, place: publisherPlace });

//     // Department
//     let department = await Department.findOne({ name: departmentName });
//     if (!department) department = await Department.create({ name: departmentName });

//     // Course
//     let course = await Course.findOne({ name: courseName, department: department._id });
//     if (!course) course = await Course.create({ name: courseName, department: department._id, lastAccessionNo: 0 });

//     // Vendor
//     let foundVendor = await Vendor.findOne({ name: vendor });
//     if (!foundVendor) foundVendor = await Vendor.create({ name: vendor });

//     // VendorBill
//     let vendorBill = await VendorBill.findOne({ vendor: foundVendor._id, billNo });
//     if (!vendorBill) {
//       vendorBill = await VendorBill.create({
//         vendor: foundVendor._id,
//         billNo,
//         billDate,
//         costPerCopy: cost
//       });
//     }

//     // BookVolume check
//     let bookVolume = await BookVolume.findOne({
//       title,
//       edition,
//       author: author._id,
//       publisher: publisher._id,
//       course: course._id
//     });

//     let newCopies = [];
//     for (const singleCopy of copies) {
//       let accessionNumber = singleCopy.accessionNo || ++course.lastAccessionNo;

//       newCopies.push({
//         accessionNo: accessionNumber,
//         rackNo: singleCopy.rackNo,
//         shelfNo: singleCopy.shelfNo,
//         cost,
//         vendorBill: vendorBill._id,
//         status: 'available',
//         entryDate: new Date()
//       });
//     }

//     await course.save();

//     if (bookVolume) {
//       bookVolume.copies.push(...newCopies);
//       await bookVolume.save();
//       return res.status(200).json({ message: 'Copies added to existing book volume', bookVolume });
//     } else {
//       const newBookVolume = await BookVolume.create({
//         title,
//         edition,
//         isbn,
//         pages,
//         author: author._id,
//         publisher: publisher._id,
//         department: department._id,
//         course: course._id,
//         vendorBill: vendorBill._id,
//         copies: newCopies
//       });

//       return res.status(201).json({ message: 'New book volume created', bookVolume: newBookVolume });
//     }
//   } catch (error) {
//     console.error('Error in addBookVolume:', error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.addBookVolume = async (req, res) => {
//   try {
//     const { author, publisher, department, vendorBill, course, noOfBooks, rackNo, shelfNo, cost, ...rest } = req.body;

//     // 1) Author
//     const authorName = author.name.trim();
//     let authorDoc = await Author.findOne({ name: authorName });
//     if (!authorDoc) authorDoc = await Author.create({ name: authorName });

//     // 2) Publisher
//     let publisherDoc;
//     if (publisher?.name?.trim()) {
//       const publisherName = publisher.name.trim();
//       publisherDoc = await Publisher.findOne({ name: publisherName });
//       if (!publisherDoc) {
//         publisherDoc = await Publisher.create({
//           name: publisherName,
//           place: publisher.place?.trim() || ""
//         });
//       }
//     }

//     // 3) Department
//     const deptName = department.name.trim();
//     let deptDoc = await Department.findOne({ name: deptName });
//     if (!deptDoc) deptDoc = await Department.create({ name: deptName });

//     // 4) Course
//     const courseName = course.name.trim();
//     let courseDoc = await Course.findOne({ name: courseName });
//     if (!courseDoc) {
//       courseDoc = await Course.create({
//         name: courseName,
//         department: deptDoc._id,
//         lastAccessionNo: 0
//       });
//     } else {
//       if (!courseDoc.department) {
//         courseDoc.department = deptDoc._id;
//         await courseDoc.save();
//       }
//     }

//     await courseDoc.populate('department');

//     // ✅ vendorBill handle
//     let vendorBillId = null;

//     if (req.body.vendorBill?.billNo && req.body.vendorBill?.vendor) {
//       const vendorName = req.body.vendorBill.vendor;
//       let foundVendor = await Vendor.findOne({ name: vendorName });

//       if (!foundVendor) {
//         foundVendor = await Vendor.create({ name: vendorName });
//       }

//       let foundVendorBill = await VendorBill.findOne({
//         vendor: foundVendor._id,
//         billNo: req.body.vendorBill.billNo
//       });

//       if (!foundVendorBill) {
//         foundVendorBill = await VendorBill.create({
//           vendor: foundVendor._id,
//           billNo: req.body.vendorBill.billNo,
//           billDate: req.body.vendorBill.billDate,
//           costPerCopy: req.body.vendorBill.cost
//         });
//       }

//       vendorBillId = foundVendorBill._id;
//     }

//     let start = courseDoc.lastAccessionNo || 0;
//     const copies = [];

//     for (let i = 0; i < Number(noOfBooks); i++) {
//       start += 1;
//       copies.push({
//         accessionNo: start,
//         rackNo,
//         shelfNo,
//         cost: Number(cost || 0),
//         vendorBill: vendorBillId,
//         status: 'available',
//         entryDate: new Date()
//       });
//     }

//     courseDoc.lastAccessionNo = start;
//     await courseDoc.save();

//     const existingBook = await BookVolume.findOne({
//       title: rest.title,
//       edition: rest.edition,
//       author: authorDoc._id,
//       publisher: publisherDoc?._id,
//       course: courseDoc._id
//     });

//     if (existingBook) {
//       existingBook.copies.push(...copies);
//       await existingBook.save();
//       return res.status(200).json({
//         message: "📚 Copies added to existing book",
//         book: existingBook
//       });
//     }

//     const bookData = {
//       ...rest,
//       cost: Number(cost || 0),
//       author: authorDoc._id,
//       publisher: publisherDoc?._id,
//       department: deptDoc._id,
//       course: courseDoc._id,
//       copies
//     };

//     const book = await BookVolume.create(bookData);
//     return res.status(201).json({
//       message: "✅ Book saved successfully!",
//       book
//     });

//   } catch (error) {
//     console.error("❌ Error saving book:", error);
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message || error
//     });
//   }
// };

exports.addBookVolume = async (req, res) => {
  try {
    const {
      author,
      publisher,
      department,
      vendorBill,
      course,
      noOfBooks,
      rackNo,
      shelfNo,
      cost,
      ...rest
    } = req.body;

    // 1) Author
    const authorName = author.name.trim();
    let authorDoc = await Author.findOne({ name: authorName });
    if (!authorDoc) authorDoc = await Author.create({ name: authorName });

    // 2) Publisher
    let publisherDoc;
    if (publisher?.name?.trim()) {
      const publisherName = publisher.name.trim();
      publisherDoc = await Publisher.findOne({ name: publisherName });
      if (!publisherDoc) {
        publisherDoc = await Publisher.create({
          name: publisherName,
          place: publisher.place?.trim() || ""
        });
      }
    }

    // 3) Department
    const deptName = department.name.trim();
    let deptDoc = await Department.findOne({ name: deptName });
    if (!deptDoc) deptDoc = await Department.create({ name: deptName });

    // 4) Course
    const courseName = course.name.trim();
    let courseDoc = await Course.findOne({ name: courseName });
    if (!courseDoc) {
      courseDoc = await Course.create({
        name: courseName,
        department: deptDoc._id,
        lastAccessionNo: 0
      });
    } else if (!courseDoc.department) {
      courseDoc.department = deptDoc._id;
      await courseDoc.save();
    }

    await courseDoc.populate('department');

    // 5) VendorBill handle
    let vendorBillId = null;

    if (vendorBill?.billNo && vendorBill?.vendor) {
      const vendorName = vendorBill.vendor;
      let foundVendor = await Vendor.findOne({ name: vendorName });
      if (!foundVendor) {
        foundVendor = await Vendor.create({ name: vendorName });
      }

      let foundVendorBill = await VendorBill.findOne({
        vendor: foundVendor._id,
        billNo: vendorBill.billNo
      });

      if (!foundVendorBill) {
        foundVendorBill = await VendorBill.create({
          vendor: foundVendor._id,
          billNo: vendorBill.billNo,
          billDate: vendorBill.billDate,
          costPerCopy: vendorBill.cost
        });
      }

      vendorBillId = foundVendorBill._id;
    }

    // 6) Copies generation
    let start = courseDoc.lastAccessionNo || 0;
    const copies = [];

    for (let i = 0; i < Number(noOfBooks); i++) {
      start += 1;
      copies.push({
        accessionNo: start,
        rackNo,
        shelfNo,
        cost: Number(cost || 0),
        vendorBill: vendorBillId, // ✅ vendorBill link
        status: 'available',
        entryDate: new Date()
      });
    }

    courseDoc.lastAccessionNo = start;
    await courseDoc.save();

    // 7) Check if book already exists
    const existingBook = await BookVolume.findOne({
      title: rest.title,
      edition: rest.edition,
      author: authorDoc._id,
      publisher: publisherDoc?._id,
      course: courseDoc._id
    });

    if (existingBook) {
      existingBook.copies.push(...copies);
      if (vendorBillId) existingBook.vendorBill = vendorBillId; // ✅ root vendorBill update
      await existingBook.save();

      return res.status(200).json({
        message: "📚 Copies added to existing book",
        book: existingBook
      });
    }

    // 8) New Book entry
    const bookData = {
      ...rest,
      author: authorDoc._id,
      publisher: publisherDoc?._id,
      department: deptDoc._id,
      course: courseDoc._id,
      vendorBill: vendorBillId, // ✅ root vendorBill
      copies
    };

    const book = await BookVolume.create(bookData);

    return res.status(201).json({
      message: "✅ Book saved successfully!",
      book
    });

  } catch (error) {
    console.error("❌ Error saving book:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message || error
    });
  }
};

exports.lastAccessionNo =  async (req, res) => {
  try {
    const courseName = req.query.course;
    if (!courseName) return res.status(400).json({ message: "Course is required" });

    const courseDoc = await Course.findOne({ name: courseName.trim() });
    if (!courseDoc) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json({
      course: courseDoc.name,
      lastAccessionNo: courseDoc.lastAccessionNo || 0
    });
  } catch (err) {
    console.error("❌ Error getting last accession number:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

exports.getBookByISBN = async (req, res) => {
  try {
    const book = await BookVolume.findOne({ isbn: req.params.isbn })
      .populate('author')
      .populate('publisher')
      .populate('department')
      .populate('course');

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ book });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.saveVendorBill = async (req, res) => {
  try {
    const { vendor, billNo, billDate, cost } = req.body;

    let foundVendor = await Vendor.findOne({ name: vendor });
    if (!foundVendor) {
      foundVendor = await Vendor.create({ name: vendor });
    }

    let vendorBill = await VendorBill.findOne({
      vendor: foundVendor._id,
      billNo
    });

    if (!vendorBill) {
      vendorBill = await VendorBill.create({
        vendor: foundVendor._id,
        billNo,
        billDate,
        costPerCopy: cost
      });
    }

    res.status(201).json({ message: 'Vendor Bill Saved', vendorBill });
  } catch (err) {
    console.error('Error saving vendor bill:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.searchAuthors = async (req, res) => {
  try {
    const query = req.query.query || '';
    const authors = await Author.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Error searching authors', error: err.message });
  }
};

// Publisher search
exports.searchPublishers = async (req, res) => {
  try {
    const query = req.query.query || '';
    const publishers = await Publisher.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json(publishers);
  } catch (err) {
    res.status(500).json({ message: 'Error searching publishers', error: err.message });
  }
};

// Vendor search
exports.searchVendors = async (req, res) => {
  try {
    const query = req.query.query || '';
    const vendors = await Vendor.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Error searching vendors', error: err.message });
  }
};

// Course search
exports.searchCourses = async (req, res) => {
  try {
    const query = req.query.query || '';
    const courses = await Course.find({ name: { $regex: query, $options: 'i' } }).populate('department');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error searching courses', error: err.message });
  }
};

// Department search
exports.searchDepartments = async (req, res) => {
  try {
    const query = req.query.query || '';
    const departments = await Department.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Error searching departments', error: err.message });
  }
};

// GET /library/title/search?query=xyz
exports.seachTitle =  async (req, res) => {
  const query = req.query.query || '';
  try {
    const titles = await BookVolume.find({ title: { $regex: query, $options: 'i' } }).distinct('title');
    res.status(200).json(titles);
  } catch (err) {
    res.status(500).json({ message: 'Error searching titles', error: err.message });
  }
}
