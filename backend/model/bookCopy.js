const mongoose = require("mongoose");

const bookCopySchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: true },
  accessionNumber: { type: Number, required: true, unique: true },
  rackNo: String,
  shelfNo: String,
});

module.exports = mongoose.model("bookCopie", bookCopySchema);
