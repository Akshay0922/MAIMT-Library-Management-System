const express = require("express");
const router = express.Router();
const controller = require("../controller/issueController");

router.post("/issue-book", controller.issueBook); // Submit
router.post("/fetch-book-student", controller.fetchBookAndStudent); // Autofill

module.exports = router;
