const express=require("express")
const router=express.Router()
// const upload = require("../middleware/uploadImages"); 

const bookController=require("../controller/booksController")
router.post("/add-books", bookController.createBook); 
module.exports=router;