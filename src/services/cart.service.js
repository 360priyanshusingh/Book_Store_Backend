import sequelize, { DataTypes } from '../config/database';
const Cart = require('../models/cart.js')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';
// import bcrypt  from 'bcrypt' ;
// import dotenv from 'dotenv'
// import jwt from 'jsonwebtoken';
// import sendEmail from '../config/sendEmail';

// dotenv.config()

// let otp=''


//create new user
export const createCart = async (user,body) => {
  if(user.role==='user'){
    return{
      code:HttpStatus.ACCEPTED,
      data:[],
      message:"You are not authorize !"
    }
  }
  else{
    const book = await Cart.create(body);
    return{
      code:HttpStatus.ACCEPTED,
      data:book,
      message:'Cart Succesfully Created'
    }
  }

};
