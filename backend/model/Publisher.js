const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String }
});

module.exports = mongoose.model('Publisher', publisherSchema);
