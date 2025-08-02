const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});
const Publisher = mongoose.model('Publisher', publisherSchema);