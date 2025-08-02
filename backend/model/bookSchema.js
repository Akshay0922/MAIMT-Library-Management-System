const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  accessionNumber: { type: String, required: true, unique: true },
  entryDate: { type: Date, required: true },
  bookName: { type: String, required: true },
  title: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  edition: { type: String },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  pages: { type: Number },
  isbn: { type: String },
  noOfBooks: { type: Number },
  rackNumber: { type: String },
  shelfNumber: { type: String },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' },
  publishYear: { type: Number },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  billNo: { type: String },
  billDate: { type: Date },
  costOnBill: { type: Number }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
