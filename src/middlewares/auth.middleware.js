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
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const  user  = await jwt.verify(bearerToken,process.env.JWT_SECRET_USER);
    console.log(user)
    req.body.userId= user.userId ;
    req.body.role= user.role ;
    next();
  } catch (error) {
    next(error);
  }
};


