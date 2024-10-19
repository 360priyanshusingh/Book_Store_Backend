import HttpStatus from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Middleware to authenticate if user has a valid role.
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const verifyRole = async (req, res, next) => {
  console.log("verify role: ", req.body);
  try {

    if (req.body.role === 'admin') {
      next();  
    } else {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Unauthorized Role!'
      };
    }
  } catch (error) {
   
    next(error);
  }
};
