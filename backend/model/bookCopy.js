const mongoose = require("mongoose");

const bookCopySchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true
  },
  accessionNumber: {
    type: Number,
    required: true,
    unique: true
  },
  rackNo: {
    type: String
  },
  shelfNo: {
    type: String
  },
  status: {
    type: String,
    enum: ["available", "issued", "lost", "damaged"],
    default: "available"
  }
}, { timestamps: true });

module.exports = mongoose.model("BookCopy", bookCopySchema);
