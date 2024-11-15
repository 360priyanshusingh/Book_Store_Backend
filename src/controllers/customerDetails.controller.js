import HttpStatus from 'http-status-codes';
import * as customerDetailsService from '../services/customerDetails.service';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createCustomerDetails = async (req, res) => {

  try {
    const data = await customerDetailsService.createCustomerDetails(req.body);
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
export const updateCustomerDetails = async (req, res) => {

  try {
    const data = await customerDetailsService.updateCustomerDetails(req.body,req.params.id);
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
export const getCustomerDetails = async (req, res) => {

  try {
    const data = await customerDetailsService.getCustomerDetails(req.body.userId);
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



