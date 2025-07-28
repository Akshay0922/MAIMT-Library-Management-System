const express=require("express")
const router=express.Router()
const controller=require("../controller/issueController")
router.post("/issue-book",controller.issueBook)
module.exports=router;