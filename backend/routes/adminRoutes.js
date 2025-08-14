const express=require("express")
const router=express.Router()
const controller=require("../controller/adminController")
// const verifyToken=require("../middleware/authMiddleware")


router.post("/signup",controller.signup)
router.post("/login",controller.login)
router.post("/change-password",controller.changePassword);

module.exports=router;