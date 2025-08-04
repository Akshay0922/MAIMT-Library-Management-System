// controllers/bookController.js
const BookVolume = require('../model/BookVolume');
const Course = require('../model/Course');
const Vendor = require('../model/Vendor');
const VendorBill = require('../model/VendorBill');
const Author = require('../model/Author');
const Publisher = require('../model/Publisher');
const Department = require('../model/Department');

exports.addBookVolume = async (req, res) => {
  try {
    const {
      title,
      edition,
      isbn,
      pages,
      departmentName,
      courseName,
      authorName,
      publisherName,
      publisherPlace,
      vendorName,
      billNo,
      billDate,
      costPerCopy,
     
      rackNo,
      shelfNo
    } = req.body;

   
    let author = await Author.findOne({ name: authorName });
    if (!author) {
      author = await Author.create({ name: authorName });
    }

    
    let publisher = await Publisher.findOne({ name: publisherName });
    if (!publisher) {
      publisher = await Publisher.create({ name: publisherName, place: publisherPlace });
    }

    let department = await Department.findOne({ name: departmentName });
    if (!department) {
      department = await Department.create({ name: departmentName });
    }
 
    let course = await Course.findOne({ name: courseName, department: department._id });
    if (!course) {
      course = await Course.create({ name: courseName, department: department._id, lastAccessionNo: 0 });
    }

    
    let vendor = await Vendor.findOne({ name: vendorName });
    if (!vendor) {
      vendor = await Vendor.create({ name: vendorName });
    }

    
    let vendorBill = await VendorBill.findOne({ vendor: vendor._id, billNo });
    if (!vendorBill) {
      vendorBill = await VendorBill.create({
        vendor: vendor._id,
        billNo,
        billDate,
        costPerCopy
      });
    }

    
    let bookVolume = await BookVolume.findOne({
      title,
      edition,
      author: author._id,
      publisher: publisher._id,
      course: course._id
    });

    let newCopies = [];
const copiesFromReq = req.body.copies; // Array of copies
const numberOfCopies = copiesFromReq.length;

for (let i = 0; i < numberOfCopies; i++) {
  const singleCopy = copiesFromReq[i];

  let accessionNumber;
  if (singleCopy.accessionNo) {
    accessionNumber = singleCopy.accessionNo;
  } else {
    course.lastAccessionNo += 1;
    accessionNumber = course.lastAccessionNo;
  }

  newCopies.push({
    accessionNo: accessionNumber,
    rackNo: singleCopy.rackNo,
    shelfNo: singleCopy.shelfNo,
    cost: costPerCopy,
    vendorBill: vendorBill._id,
    status: 'available',
    entryDate: new Date()
  });
}

await course.save();


    
    if (bookVolume) {
      bookVolume.copies.push(...newCopies);
      await bookVolume.save();

      return res.status(200).json({
        message: 'Copies added to existing book volume',
        bookVolume
      });
    } else {
      const newBookVolume = await BookVolume.create({
        title,
        edition,
        isbn,
        pages,
        author: author._id,
        publisher: publisher._id,
        department: department._id,
        course: course._id,
        vendorBill: vendorBill._id,
        copies: newCopies
      });

      return res.status(201).json({
        message: 'New book volume created',
        bookVolume: newBookVolume
      });
    }
  } catch (error) {
    console.error('Error in addBookVolume:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};
