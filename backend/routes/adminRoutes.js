const express=require("express")
const router=express.Router()
const controller=require("../controller/adminController")
// const verifyToken=require("../middleware/authMiddleware")
const User = require("../model/User");
const Admin = require("../model/admin");

router.post("/signup",controller.signup)
router.post("/login",controller.login)
router.post("/change-password",controller.changePassword);

router.get("/all-admin",controller.getAllAdmin);

router.delete("/delete/:id", controller.deleteAdmin);


module.exports=router;