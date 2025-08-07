// routes/issueRoutes.js

const express = require("express");
const router = express.Router();
const controller = require("../controller/issueController");

// 🔁 Info route (student + book by accessionNo)
// router.post("/info", controller.getStudentAndBookInfo);

// 📚 Issue book route
router.post("/issue", controller.issueBook);

module.exports = router;
