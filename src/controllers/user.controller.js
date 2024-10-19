import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    // next(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: error
    });
  }
};

// export const loginAdmin = async (req, res, next) => {
//   try {
//     const data = await UserService.loginAdmin(req.body);
//     res.status(data.code).json({
//       code: data.code,
//       data: data.data,
//       message: data.message
//     });
//   } catch (error) {
//     // next(error);
//     res.status(HttpStatus.BAD_REQUEST).json({
//       code: HttpStatus.BAD_REQUEST,
//       data: null,
//       message: error
//     });
//   }
// };

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgetFassword = async(req,res,next)=>{
  try {
    const data = await UserService.forgetFassword(req.body);
    res.status(data.code).json({
      code:data.code,
      data:data.data,
      message:data.message
    })
    
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      data:[],
      message:error
    })
  }
}

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: error
    });

  }
};
export const newAdmin = async (req, res, next) => {
  try {
    const data = await UserService.newAdmin(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: error
    });

  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async(req,res,next)=>{
  try {
    const data = await UserService.resetPassword(req.params.email,req.body);
    res.status(data.code).json({
      code:data.code,
      data:data.data,
      message:data.message
    })
    
  } catch (error) {
    console.log(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code:HttpStatus.INTERNAL_SERVER_ERROR,
      data:[],
      message:error
    })
  }
}


/**
 * Controller to delete a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */