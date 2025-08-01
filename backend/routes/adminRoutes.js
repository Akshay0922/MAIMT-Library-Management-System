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

// New route: /all-users-combined

// router.get('/all-users-combined', async (req, res) => {
//   try {
//     const users = await User.find({});
//     const admins = await Admin.find({});
    
//     const combined = [
//       ...admins.map((admin) => ({ ...admin._doc, role: "admin" })),
//       ...users.map((user) => ({ ...user._doc, role: "user" }))
//     ];

//     res.status(200).json(combined);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching users and admins" });
//   }
// });


module.exports=router;