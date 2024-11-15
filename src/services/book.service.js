import sequelize, { DataTypes } from '../config/database';
const Book = require('../models/book.js')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';
// import bcrypt  from 'bcrypt' ;
// import dotenv from 'dotenv'
// import jwt from 'jsonwebtoken';
// import sendEmail from '../config/sendEmail';

// dotenv.config()

// let otp=''


//create new user
export const createBook = async (body) => {
    const book = await Book.create(body);
    return{
      code:HttpStatus.ACCEPTED,
      data:book,
      message:'Book Succesfully created'
    }
  

};

export const updateBook = async (bookId,body) => {

    const book = await Book.findOne({where:{id:bookId}});

    if(!book){
      return{
        code:HttpStatus.ACCEPTED,
        data:[],
        message:'Book Not Exit !'
      }
    }
    
    book.description=body.description;
    book.price=body.price;
    book.quantity=body.quantity;
    book.author=body.author;
    book.imgUrl=body.imgUrl;
    book.discountPrice=body.discountPrice;
    book.bookName=body.bookName?body.bookName: book.bookName;
    book.save()
     
    return{
      code:HttpStatus.ACCEPTED,
      data:book,
      message:'Book Succesfully Update'
    }
  

};

export const getAllBook = async (body) => {
     console.log(body)
    const book = await Book.findAll();
    if(!book){
      return{
        code:HttpStatus.ACCEPTED,
        data:[],
        message:'Book not exit !'
      }

    }
    else{
      return{
        code:HttpStatus.ACCEPTED,
        data:book,
        message:'get All Book Succesfully'
      }
    
    }
   

};


export const getAllBookById = async (bookId) => {
  const book = await Book.findOne({where:{id:bookId}});

  if(!book){
    return{
      code:HttpStatus.ACCEPTED,
      data:[],
      message:"Book Not Exit!"
    }
  }
  else{
 
    return{
      code:HttpStatus.ACCEPTED,
      data:book,
      message:'get All Book Succesfully'
    }
  }

};

export const deleteBook = async (bookId) => {
  const book = await Book.destroy({where:{id:bookId}});

  if(!book){
    return{
      code:HttpStatus.ACCEPTED,
      data:[],
      message:"Book Not Exit !"
    }
  }
  else{
  
    return{
      code:HttpStatus.ACCEPTED,
      data:book,
      message:'book deleted'
    }

  }

};

