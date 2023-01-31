const BooksService =  require("../services/books");


/**
 * Function that receives details of new book to be added from frontend and pass it to respective service
 * @param  req - The request body that contains details of the new book that is to be added
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
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


/**
 * Function that fetches all the book records through service and pass it to frontend
 * @param  req - The request body
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
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

/**
 * Function that fetches the details of particular book through service and pass it to frontend
 * @param  req - The request param contains the id of the book to be fetched
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
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


/**
 * Function that updates the details of particular book through service
 * @param  req - The request param contains the id of the book to be updated
 *                and request body contains the new details of the book 
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
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


/**
 * Function that deletes the details of particular book through service
 * @param  req - The request param contains the id of the book to be deleted
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
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