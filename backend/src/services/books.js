const Book = require("../models/book");

/**
 * Function to add new book record to the database
 * @param  newBookData - The details of the new book that is to be added
 * @returns The details of the new record created in database
 */
const addNewBook = async (newBookData) => {
    try{
        const newBook = await Book.create(newBookData)
        return newBook;
    }
    catch(err) {
        throw new Error(err.message);
    }    
}

/**
 * Function to get all the book records from the database
 * @param  
 * @returns The array of book records that are present in database
 */
const getAllBooks = async () => {
    try{
        const allBooks = await Book.findAll();
        return allBooks;
    }catch(err) {
        throw new Error(err.message);
    }
}

/**
 * Function to get particular book record corresponding to given id from the database
 * @param  id - The id of the book record that is to be fetched
 * @returns The details of book record corresponding to that id fetched from the database
 */
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

/**
 * Function to update the book record corresponding to given id in the database
 * @param  newBookData - The updated book details that are to be written in corresponding book record
 * @param  id - The id of the book record to be updated
 * @returns The array of number of books updated in database
 */
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

/**
 * Function to delete the book record of corresponding id from the database
 * @param  id - The id of the book that is to be deleted
 * @returns The array of number of  book records deleted from the database
 */
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