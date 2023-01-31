const Book = require("../models/book");

//Add new book to the database
const addNewBook = async (newBookData) => {
    try{
        const newBook = await Book.create(newBookData)
        return newBook;
    }
    catch(err) {
        throw new Error(err.message);
    }    
}

//Get all the books in the database
const getAllBooks = async () => {
    try{
        const allBooks = await Book.findAll();
        return allBooks;
    }catch(err) {
        throw new Error(err.message);
    }
}

//Get a book using id from database
const getBookByBookId = async (id) => {
    try{
        const book = await Book.findByPk(id);
        if(book==null)
        {
            throw new Error(`Book not found with id: ${id}`)
        }
        return book;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

//Update book information in the database using book id
const updateBookByBookId = async(newBookData,id) =>{
    try{
        const response = await Book.update(newBookData, {
            where: {
                id
            }
        });
        if(response==0)
        {
            throw new Error(`Book not found with id: ${id}`);
        }
        return response;
    }catch(err)
    {
        throw new Error(err.message);
    }
}

//Delete the book of given id from the database
const deleteBookByBookId = async(id) => {
    try {
      const response = await Book.destroy({
        where: {
          id,
        },
      });
      if (response == 0) {
        throw new Error(`Book not found with id: ${id}`);
      }
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
}



module.exports = {
    addNewBook,
    getAllBooks,
    getBookByBookId,
    updateBookByBookId,
    deleteBookByBookId
}