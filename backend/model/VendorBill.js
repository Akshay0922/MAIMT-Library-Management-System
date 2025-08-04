const mongoose = require('mongoose');

const vendorBillSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  billNo: { type: String, required: true },
  billDate: { type: Date, required: true },
  costPerCopy: { type: Number, required: true }
});

module.exports = mongoose.model('VendorBill', vendorBillSchema);
