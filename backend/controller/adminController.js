const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
//signup
exports.signup = async (req, res) => {
    try {
        const { adminName, adminEmail, adminNo, password } = req.body;

        const firstName = adminName.trim().split(" ")[0].toLowerCase();
        const customId = `${firstName}.${adminNo}`;

        const exist = await Admin.findById(customId);
        if (exist) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hash = await bcrypt.hash(password, 10);

        const admin = new Admin({
            _id:customId,
            adminName,
            adminEmail,
            adminNo,
            password: hash
          
        });

        await admin.save();

        res.status(201).json({
            message: "Signup successfully",
            token: generateToken(admin),
            admin: {
                id: admin._id,
                adminName: admin.adminName,
                adminEmail: admin.adminEmail,
                role: admin.role
            },
            success: true
        });

    } catch (err) {
        if (err.code == 11000) {
            const duplicateField = Object.keys(err.keyPattern)[0];
            return res.status(400).json({
                message: `User already exists with this ${duplicateField}`,
                success: false
            });
        }

        
        return res.status(500).json({
            message: "Server error",
            error: err.message,
            success: false
        });
    }
};
//login
exports.login = async (req, res) => {
  try {
    const { adminId, email, password } = req.body;

    const isAdminExist = await Admin.findById(adminId);
    if (!isAdminExist) {
      return res.status(400).json({ message: "Admin not found", success: false });
    }

    if (email !== isAdminExist.adminEmail) {
      return res.status(400).json({ message: "Admin not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, isAdminExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Admin not found", success: false });
    }

    return res.status(200).json({
      message: "Login successful",
      token: generateToken(isAdminExist),
      admin: {
        id: isAdminExist._id,
        adminName: isAdminExist.adminName,
        adminEmail: isAdminExist.adminEmail,
        role: isAdminExist.role,
      },
      success: true,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server error during login",
      error: err.message,
      success: false
    });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const {  adminId, currentPassword, newPassword } = req.body;

const admin = await Admin.findOne({ _id: adminId });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found", success: false });
    }
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect", success: false });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashPassword;
    await admin.save();

    return res.status(200).json({ message: "Password changed successfully", success: true });

  } catch (error) {
    console.error("Change password error:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

