const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  lastAccessionNo: { type: Number }
});
const Course = mongoose.model('Course', courseSchema);