const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});
module.exports = mongoose.model('Publisher', publisherSchema);