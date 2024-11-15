import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service.js';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addItem = async (req, res) => {
  try {
    const data = await CartService.addItem(req.body,req.params.id);
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

export const updateQuantity = async (req, res) => {
  try {
    const data = await CartService.updateQuantity(req.body,req.params.id);
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

export const deleteItem = async (req, res) => {
  try {
    const data = await CartService.deleteItem(req.body,req.params.id);
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
export const removeItem = async (req, res) => {
  try {
    const data = await CartService.removeItem(req.body,req.params.id);
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


export const deleteCart = async (req, res) => {
  try {
    const data = await CartService.deleteCart(req.params.id);
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

export const getCartById = async (req, res) => {
  console.log(req.body)
  try {
    const data = await CartService.getCartById(req.body.userId);
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