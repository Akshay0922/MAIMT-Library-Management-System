const express=require("express")
const router=express.Router()
const controller=require("../controller/returnController")
router.post("/return-book",controller.returnBook)
module.exports=router;