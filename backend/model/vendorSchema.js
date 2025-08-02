const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  place: { type: String }
});
const Vendor = mongoose.model('Vendor', vendorSchema);