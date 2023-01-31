const router = require("express").Router();
const {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../controllers/booksController");

router.post("/add", addNewBook);
router.get("/all", getAllBooks);
router.get("/:id", getBookById);
router.put("/edit/:id", updateBookById);
router.delete("/delete/:id", deleteBookById);

module.exports = router;
