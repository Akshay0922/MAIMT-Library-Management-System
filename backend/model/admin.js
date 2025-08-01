const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    _id: String,
    adminName: {
        type: String,
        required: true,
        trim: true
    },
    adminEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    adminNo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        
    },
    lastLogin: {
  type: Date,
  default: null
}
,
    role: { type: String, default: "admin" }

}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
