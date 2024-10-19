import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service.js';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createBook = async (req, res) => {
  console.log(req.body)
  try {
    
    const data = await BookService.createBook(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
     console.log(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: error
    });

  }
};

export const updateBook = async (req, res) => {
  try {
    const data = await BookService.updateBook(req.params.id,req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
     console.log(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: error
    });

  }
};

export const getAllBookById = async (req, res) => {
  try {
    const data = await BookService.getAllBookById(req.params.id);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
     console.log(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: error
    });

  }
};



export const deleteBook = async (req, res) => {
  try {
    const data = await BookService.deleteBook(req.params.id);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
     console.log(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: error
    });

  }
};

export const getAllBook = async (req, res) => {
  try {
    const data = await BookService.getAllBook(req.params.id);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
     console.log(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: error
    });

  }
};




