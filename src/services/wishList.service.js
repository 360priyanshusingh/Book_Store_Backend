import sequelize, { DataTypes } from '../config/database';
const WishList = require('../models/wishList.js')(sequelize, DataTypes);
const Book = require('../models/book.js')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';

export const addItem = async (body,bookId) => {
    let wishList = await WishList.findOne({ where: { userId: body.userId } });

    if (!wishList) {
        wishList = await WishList.create({ userId: body.userId });
        
        const book = await Book.findOne({ where: { id: bookId} });
        if (!book) {
            return { code: HttpStatus.NOT_FOUND, message: 'Book not found' };
        }

        const bookData = {
            id: book.id,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            adminId: book.adminId,
            description: book.description,
            price: book.price,
            discountPrice:book.discountPrice,
            imgUrl:book.imgUrl,
        };

        wishList.books = wishList.books || [];  
        wishList.books = [...wishList.books, bookData];

        await wishList.save();

    } else {
        // Check if the book already exists in the cart
        let existingBook = wishList.books.find((book) => {
            if(book.id == bookId){
                return book
            }
        });
        console.log(existingBook)

        if (existingBook) {
            // If the book already exists, increment its quantity
            const updatedBooks = wishList.books.map((book) => {
                if (book.id == bookId) {
                    return {
                        ...book,
                        quantity: book.quantity + 1
                    };
                }
                return book;
            });
          
            wishList.setDataValue('books', updatedBooks); 
     
            wishList.books=[...updatedBooks]

            console.log("Updated cart books",wishList.books)
            await wishList.save();
        } else {
            
            const book = await Book.findOne({ where: { id: bookId } });

            if (!book) {
                return { code: HttpStatus.NOT_FOUND, message: 'Book not found' };
            }

         
            const newBookData = {
                id: book.id,
                bookName: book.bookName,
                author: book.author,
                quantity: 1,
                adminId: book.adminId,
                description: book.description,
                price: book.price,
                imgUrl:book.imgUrl,
            };

            wishList.books = [...wishList.books, newBookData];
         
            await wishList.save();
        }
    }

    return {
        code: HttpStatus.ACCEPTED,
        data: wishList,
        message: 'WishList successfully updated',
    };
};

export const removeItem = async (body,bookId) => {
    let wishList = await WishList.findOne({ where: { userId: body.userId } });

    if (!wishList) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: [],
            message: 'WishList not Exit !',
        };

    } else {
       
        let existingBook = wishList.books.find((book) => {
            if(book.id == bookId){
                return book
            }
        });
        console.log(existingBook)

        if (existingBook) {
          
            let updatedBooks = wishList.books
             .map((book) => {
              if (book.id == bookId) {
                return {
                  ...book,
                 quantity: book.quantity - 1
                };
            }
              return book; 
           });

            updatedBooks = updatedBooks.filter((book)=>{
                if (book.quantity >0) {
                    return book ;
                }

            })


            wishList.setDataValue('books', updatedBooks); 
     
            wishList.books=[...updatedBooks]

            console.log("Updated cart books",wishList.books)
            await wishList.save();
        } else {
            
            return {
                code: HttpStatus.BAD_REQUEST,
                data: [],
                message: 'wishList book not Exit !',
            };
        }
    }

    return {
        code: HttpStatus.ACCEPTED,
        data: wishList,
        message: 'wishList Successfully Remove !',
    };
};




export const deleteWishList = async (userId) => {
 let wishList = await WishList.findOne({ where: { userId:userId } });   

  if(!wishList){
    return {
        code: HttpStatus.ACCEPTED,
        data: [],
        message: 'WishList not exit',
      };
  }
  else{
    wishList = await WishList.destroy({ where: { userId:userId } })
    return {
        code: HttpStatus.ACCEPTED,
        data: wishList,
        message: 'WishList successfully deleted',
      };
  } 
  };
  
export const getWishList = async (userId) => {
 let wishList = await WishList.findOne({ where: { userId:userId } });    
  if(!wishList){
    return {
        code: HttpStatus.ACCEPTED,
        data: [],
        message: 'WishList not exit',
      };
  }
  else{
 
    return {
        code: HttpStatus.ACCEPTED,
        data: wishList,
        message: 'WishList Successfully Get!',
      };
  } 
  };
  

  export const deleteItem = async (body,bookId) => {
    
    let wishList = await WishList.findOne({ where: { userId: body.userId } });

    if (!wishList) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: [],
            message: 'WishList not Exit !',
        };

    } else {
        // Check if the book already exists in the cart
        let existingBook = wishList.books.find((book) => {
            if(book.id == bookId){
                return book
            }
        });
        console.log(existingBook)

        if (existingBook) {
            let updatedBooks = wishList.books
             .filter((book) => {
              if (book.id != bookId) {
                return book;
            }
           });

           wishList.setDataValue('books', updatedBooks); 
     
           wishList.books=[...updatedBooks]
        

            console.log("Updated wishList books",wishList.books)
            await wishList.save();

        } else {
            
            return {
                code: HttpStatus.BAD_REQUEST,
                data: [],
                message: 'WishList book not Exit !',
            };
        }
    }

    return {
        code: HttpStatus.ACCEPTED,
        data: wishList,
        message: 'Book Successfully delete !',
    };
};