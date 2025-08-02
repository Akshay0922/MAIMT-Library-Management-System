const express=require("express")
const router=express.Router()
const authController=require("../controller/authController")

// const verifyToken=require("../middleware/authMiddleware")

router.post("/signup",authController.signup);
router.post ("/login",authController.login);
router.post ("/verify-email",authController.verifyEmail);
router.post ("/verify-otp",authController.verifyOtp);
router.post("/reset-password",authController.resetPassword);




router.post('/change-password', authController.changePassword);

router.get("/all-users",authController.getAllUsers);

router.delete("/delete/:id",authController.deleteUser);

// router.get("/student-dashboard",verifyToken,authController.studentPage)
// router.get("/admin-dashboard",verifyToken,authController.adminDashboard)

module.exports=router