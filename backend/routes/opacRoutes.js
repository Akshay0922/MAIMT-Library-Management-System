const express = require('express');
const router = express.Router();
const {searchBooks} = require("../controller/opacController");

router.post('/search', searchBooks);

module.exports = router;
