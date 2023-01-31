const BooksService =  require("../services/books");


//Add new book
const addNewBook = async (req,res) => {
  try{
    const modifiedAddBookInfo = {
      ...req.body,
      name: req.body.name.trim().toLowerCase(),
      author: req.body.author.trim().toLowerCase(),  
    };
    const newBook = await BooksService.addNewBook(modifiedAddBookInfo);
    return res.status(201).json({
      success: true,
      message: "Book added Successfully!",
      data: newBook,
    });
  }catch(err){
      return res.status(500).json({
        success: false,
        message: "Error adding new book: "+err.message
      })
    }    
}

//Get all the books
const getAllBooks = async (req,res) => {
  try{
    const allBooks = await BooksService.getAllBooks();
    return res.status(201).json({
      success: true,
      message: "All books retrieved successfully",
      data: allBooks,
    });
  }catch(err)
  {
    return res.status(500).json({
      success: false,
      message: "Error retrieving books: " + err.message,
    });
  }
}

//Get a book using id of the book 
const getBookById = async (req,res) => {
  try{
    const foundBook = await BooksService.getBookByBookId(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Found the book of given id",
      data: foundBook,
    });
  }catch(err)
  {
    return res.status(500).json({
      success: false,
      message: "Error finding the book: " + err.message,
    });
  }
}

//update a book by passing id of that book
const updateBookById = async (req,res) => {
  try{
    const modifiedUpdateBookInfo = {
      ...req.body,
      name: req.body.name.trim().toLowerCase(),
      author: req.body.author.trim().toLowerCase(),
    };
    const updatedBookId = await BooksService.updateBookByBookId(modifiedUpdateBookInfo,req.params.id);
    return res.status(201).json({
      success: true,
      message: "Updated the book successfully",
      data: updatedBookId
    });
  }catch(err)
  {
    return res.status(500).json({
      success: false,
      message: "Error updating the book: " + err.message,
    });
  }
}

//Delete the book by providing its id
const deleteBookById = async (req,res) => {
  try {
    await BooksService.deleteBookByBookId(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Deleted the book successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting the book: " + err.message,
    });
  }
}

module.exports = {
    addNewBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}