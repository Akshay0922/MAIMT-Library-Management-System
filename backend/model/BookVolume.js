const mongoose = require('mongoose');

// 🧩 Nested Copy Schema
const copySchema = new mongoose.Schema({
  accessionNo: { type: Number, required: true, unique: true },
  rackNo: { type: String },
  shelfNo: { type: String },
  cost: { type: Number },
  vendorBill: { type: mongoose.Schema.Types.ObjectId, ref: 'VendorBill' },

  status: {
    type: String,
    enum: ['available', 'issued', 'lost', 'damaged'],
    default: 'available'
  },

  entryDate: { type: Date, default: Date.now },
 
}, { _id: false });

// 📘 Main Book Volume Schema
const bookVolumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' },
  edition: { type: String },
  isbn: { type: String },

  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },

  vendorBill: { type: mongoose.Schema.Types.ObjectId, ref: 'VendorBill' },

  pages: { type: Number },        // 🔁 Optional overall book info
      

  copies: [copySchema]            
});


bookVolumeSchema.index({ title: 1, author: 1, edition: 1, publisher: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('BookVolume', bookVolumeSchema);
