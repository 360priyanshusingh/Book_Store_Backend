import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service.js';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createCart = async (req, res) => {
  try {
    const data = await CartService.createCart(req.user,req.body);
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