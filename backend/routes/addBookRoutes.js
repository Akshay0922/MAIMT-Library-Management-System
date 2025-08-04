const express = require("express");
const router = express.Router();
const bookController = require("../controller/booksController");

router.post("/add-books", bookController.addBookVolume);
router.post('/vendor/bill', bookController.saveVendorBill);
router.get('/book-by-isbn/:isbn', bookController.getBookByISBN);

router.get("/get-last-accession",bookController.lastAccessionNo);
router.get("/author/search", bookController.searchAuthors);
router.get("/publisher/search", bookController.searchPublishers);
router.get('/title/search',bookController.seachTitle);
router.get("/vendor/search", bookController.searchVendors);
router.get("/course/search", bookController.searchCourses);
router.get("/department/search", bookController.searchDepartments);
module.exports = router;
