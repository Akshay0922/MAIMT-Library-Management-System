const mongoose=require("mongoose")
const issueSchema = new mongoose.Schema({
  bookCopy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookCopie",
    required: true
  },
  user: {
    type: String, 
    ref: "user",
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: Date,
  status: {
    type: String,
    enum: ["issued", "returned"],
    default: "issued"
  }
});

module.exports=mongoose.model("Issue",issueSchema)