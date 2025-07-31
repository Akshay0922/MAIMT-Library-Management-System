const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  bookCopy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookCopy",
    required: true
  },
  user: {
    type: String, // _id from User model is String, not ObjectId
    ref: "user",
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: Date,
  status: {
    type: String,
    enum: ["issued", "returned", "overdue"],
    default: "issued"
  },
  fine: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


issueSchema.methods.calculateFine = function () {
  if (!this.returnDate) return 0;

  const issueDate = new Date(this.issueDate);
  const returnDate = new Date(this.returnDate);

  const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000; // approx 3 months
  const gracePeriod = new Date(issueDate.getTime() + threeMonthsInMs);

  if (returnDate <= gracePeriod) return 0;

  const extraDays = Math.ceil((returnDate - gracePeriod) / (1000 * 60 * 60 * 24));
  return extraDays * 5; // ₹5 per extra day
};

module.exports = mongoose.model("Issue", issueSchema);
