const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  lastAccessionNo: { type: Number, default: 0 }
});

module.exports = mongoose.model('Course', courseSchema);
