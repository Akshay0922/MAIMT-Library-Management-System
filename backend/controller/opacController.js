const Book  = require("../model/bookSchema");
exports.searchBooks = async (req, res) => {
  try {
    const { title, author, course, department, year, availableOnly, edition , publisher , rackNumber,shelfNo,} = req.body;

    const query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };
    if (course) query.course = course;
    if (department) query.department = department
    
    if (year) query.year = parseInt(year);
    if (availableOnly) query.noOfBooks = { $gt: 0 };
    if (edition) query.edition = { $regex: edition, $options: 'i' };
if (publisher) query.publisher = { $regex: publisher, $options: 'i' };
if (rackNumber) query.rackNumber = { $regex: rackNumber, $options: 'i' };
if (shelfNo) query.shelfNo = { $regex: shelfNo, $options: 'i' };

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};