const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // student ki info yahan hogi
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookVolume', // book info (title, etc.)
    required: true
  },
  accessionNo: {
    type: Number,   // copy ka exact accession no
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
  returnDate: {
    type: Date,     // jab return kare tab bharna
    default: null
  },
  status: {
    type: String,
    enum: ['issued', 'returned'],
    default: 'issued'
  },
  fine: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Issue', issueSchema);
