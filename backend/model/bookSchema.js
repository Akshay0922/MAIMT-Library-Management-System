const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  entryDate: {
    type: Date,
    required: true
  },
  bookName:String,
  title: {
    type: String,
    required: true
  },
  author: String,
  edition: String,
  volume: String,
  publisher: String,
  year: Number,
  pages: Number,
  isbn: String,
  department: String,
  course: String,
  shelfNo: String,
  rackNumber: String,
  place: String,
  vendor: String,
  billNo: String,
  billDate: Date,
  cost: Number,
  noOfBooks: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("book", bookSchema);
