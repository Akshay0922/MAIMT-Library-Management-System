// const User = require("../model/User")
// const bcrypt = require("bcrypt")
// const generateToken = require("../utils/generateToken")
// const Otp = require("../model/Otp");
// const sendOtp = require("../utils/sendMail");

// //signup

// exports.signup = async (req, res) => {
//   const { userName, fatherName, email, address, batch, course, semester, rollNumber, number, password } = req.body
//   try {
//     const firstName = userName.trim().split(" ")[0].toLowerCase()
//     const customId = `${rollNumber}.${firstName}`
//     const exist = await User.findById(customId)
//     if (exist) {
//       return res.status(400).json({ message: "User already exist", success: false })
//     }
//     const hashPassword = await bcrypt.hash(password, 10)
//     const user = new User({ _id: customId, userName, fatherName, email, address, batch, course, semester, rollNumber, number, password: hashPassword });
//     // user.lastLogin = new Date();
//     await user.save()
//     res.status(201).json({
//       message: "Signup successful", token: generateToken(user), user: {
//         id: user._id,
//         userName: user.userName,
//         email: user.email,
//         course: user.course,
//         semester: user.semester,
//         fatherName:user.fatherName,
//         address:user.address,
//         rollNumber:user.rollNumber,
//         batch:user.batch,
//         number:user.number,
//         role: user.role
//       }, success: true
//     })
//   }
//   catch (err) {
//     if (err.code == 11000) {
//       const duplicateField = Object.keys(err.keyPattern)[0];
//       return res.status(400).json({
//         message: `User already exists with this ${duplicateField}`,
//         success: false
//       });
//     }
//     res.status(500).json({ message: "Server error", error: err.message, success: false });
//   }

// }

// //login


// exports.login = async (req, res) => {
//   try {
//     const { id, email, password } = req.body;

//     // Special hardcoded check for admin
//     if (
//       id === process.env.ADMIN_ID &&
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const adminUser = await User.findById(id);

//       if (!adminUser) {
//         return res.status(404).json({
//           message: "Admin user not found in database",
//           success: false,
//         });
//       }

//       return res.status(200).json({
//         message: "Admin login successful",
//         token: generateToken(adminUser),
//         user: {
//           id: adminUser._id,
//           userName: adminUser.userName,
//           email: adminUser.email,
//           role: adminUser.role,
//         },
//         success: true,
//       });
//     }

//     // Otherwise, normal user login
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     if (user.email !== email) {
//       return res.status(401).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         message: "User not found",
//         success: false,
//       });
//     }
//   user.lastLogin = new Date();
//   await user.save();

//     return res.status(200).json({
//       message: "Login successful",
//       token: generateToken(user),
//       user: {
//        id: user._id,
//         userName: user.userName,
//         email: user.email,
//         course: user.course,
//         semester: user.semester,
//         fatherName:user.fatherName,
//         address:user.address,
//         rollNumber:user.rollNumber,
//         batch:user.batch,
//         number:user.number,
//         role: user.role
//       },
//       success: true,
//     });

//   } catch (error) {
//     console.error("Login error:", error.message);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// //get all user data 
// exports.getAllUsers =  async (req, res) => {
//   try {
//     const users = await User.find().select("userName email role lastLogin");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };


// //verify email
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const exist = await User.findOne({ email });
//     if (!exist) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     await new Otp({ email, otp, createdAt: new Date() }).save();
//     await sendOtp(email, otp);
//     return res.status(200).json({ message: "Otp send to mail" })
//   }
//   catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to send OTP", error: error.message, });

//   }
// }

// //verify otp

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const validOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
//     if (!validOtp) {
//       return res.status(400).json({ message: "OTP expired or not found" });
//     }

//     if (String(validOtp.otp) !== String(otp)) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("OTP verify error:", error);
//     res.status(500).json({ message: "Error verifying OTP", error: error.message });
//   }
// }

// //Reset password

// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;
//     const hashPassword = await bcrypt.hash(newPassword, 10);
//     const updated = await User.findOneAndUpdate({ email }, { password: hashPassword });
//     if (!updated) return res.status(404).json({ message: "User not found" });
//     res.status(200).json({ message: "Password reset successful" });
//   }
//   catch (error) {
//     res.status(500).json({ message: "Failed to reset password" });
//   }

// }












// //Change Password


// exports.changePassword = async (req, res) => {
//   try {
//     const { id, currentPassword, newPassword } = req.body;

//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

//     if (currentPassword === newPassword)
//       return res.status(400).json({ message: "New password must be different from current password" });

//     const hashPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashPassword;
//     await user.save();

//     res.status(200).json({ message: "Password changed successfully" });
//   } catch (error) {
//     console.error("Change password error:", error.message);
//     res.status(500).json({ message: "Failed to change password", error: error.message });
//   }
// };

const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const Otp = require("../model/Otp");
const sendOtp = require("../utils/sendMail");

// ✅ Signup Controller
exports.signup = async (req, res) => {
  const {
    userName, fatherName, email, address, batch, course,
    semester, rollNumber, number, password
  } = req.body;

  try {
    const firstName = userName.trim().split(" ")[0].toLowerCase();
    const customId = `${rollNumber}.${firstName}`;

    const exist = await User.findById(customId);
    if (exist) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: customId,
      userName,
      fatherName,
      email,
      address,
      batch,
      course,
      semester,
      rollNumber,
      number,
      password: hashPassword
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      token: generateToken(user),
      user: {
        id: user._id,
        userName,
        email,
        course,
        semester,
        fatherName,
        address,
        rollNumber,
        batch,
        number,
        role: user.role
      },
      success: true
    });
  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        message: `User already exists with this ${duplicateField}`,
        success: false
      });
    }
    res.status(500).json({ message: "Server error", error: err.message, success: false });
  }
};

// ✅ Login Controller
exports.login = async (req, res) => {
  try {
    const { id, email, password } = req.body;

    // Admin Login (ENV based)
    if (
      id === process.env.ADMIN_ID &&
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const adminUser = await User.findById(id);
      if (!adminUser) {
        return res.status(404).json({ message: "Admin not found", success: false });
      }

      adminUser.lastLogin = new Date();
      await adminUser.save();

      return res.status(200).json({
        message: "Admin login successful",
        token: generateToken(adminUser),
        user: {
          id: adminUser._id,
          userName: adminUser.userName,
          email: adminUser.email,
          role: adminUser.role
        },
        success: true
      });
    }

    // Normal User Login
    const user = await User.findById(id);
    if (!user || user.email !== email) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user),
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        course: user.course,
        semester: user.semester,
        fatherName: user.fatherName,
        address: user.address,
        rollNumber: user.rollNumber,
        batch: user.batch,
        number: user.number,
        role: user.role
      },
      success: true
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ Get All Users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("userName email role lastLogin rollNumber batch course").sort({ lastLogin: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error", success: false });
  }
};

// ✅ Verify Email for OTP
exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const exist = await User.findOne({ email });

    if (!exist) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await new Otp({ email, otp, createdAt: new Date() }).save();
    await sendOtp(email, otp);

    res.status(200).json({ message: "OTP sent to email", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to send OTP", error: error.message, success: false });
  }
};

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const validOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!validOtp || String(validOtp.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid or expired OTP", success: false });
    }

    res.status(200).json({ message: "OTP verified successfully", success: true });
  } catch (error) {
    console.error("OTP verify error:", error.message);
    res.status(500).json({ message: "Error verifying OTP", error: error.message, success: false });
  }
};

// ✅ Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updated = await User.findOneAndUpdate(
      { email },
      { password: hashPassword }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "Password reset successful", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error: error.message, success: false });
  }
};

// ✅ Change Password
exports.changePassword = async (req, res) => {
  try {
    const { id, currentPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Current password is incorrect", success: false });

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password must be different", success: false });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully", success: true });
  } catch (error) {
    console.error("Change password error:", error.message);
    res.status(500).json({ message: "Failed to change password", error: error.message, success: false });
  }
};

exports.deleteUser = async(req,res)=>
{
   
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}

