const mongoose = require("mongoose");

const accessionTrackerSchema = new mongoose.Schema({
  course: { type: String, required: true, unique: true },
  startRange: { type: Number, required: true },
  current: { type: Number, required: true },
});

module.exports = mongoose.model("AccessionTracker", accessionTrackerSchema);
