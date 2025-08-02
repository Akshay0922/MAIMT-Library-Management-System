const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lastAccessionNo: { type: Number ,default:0}
});
module.exports= mongoose.model('Course', courseSchema);