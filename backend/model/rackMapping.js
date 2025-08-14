const mongoose = require("mongoose");

const rackMappingSchema = new mongoose.Schema({
  rackNo: { type: String, required: true },
  shelfRanges: [
    {
      shelfNo: Number,
      department: String
    }
  ]
});

module.exports = mongoose.model("RackMapping", rackMappingSchema);
