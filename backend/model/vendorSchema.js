const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  place: { type: String }
});
module.exports = mongoose.model('Vendor', vendorSchema);