import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const addRole = async (req, res, next) => {
  try {
    if(req.path === "/signup"){
        req.body.role = 'user';
      }else{
        req.body.role = 'admin';
      }

    next();
  } catch (error) {
    next(error);
  }
};
