import sequelize, { DataTypes } from '../config/database';
const Cart = require('../models/cart.js')(sequelize, DataTypes);
const Book = require('../models/book.js')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';






export const addItem = async (body) => {
    let cart = await Cart.findOne({ where: { userId: body.userId } });

    if (!cart) {
        cart = await Cart.create({ userId: body.userId });
        
        const book = await Book.findOne({ where: { id: body.bookId } });
        if (!book) {
            return { code: HttpStatus.NOT_FOUND, message: 'Book not found' };
        }

        cart.totalQuantity = 1;
        cart.totalPrice = book.price;
        cart.totalDiscountPrice=book.discountPrice

        const bookData = {
            id: book.id,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            adminId: book.adminId,
            description: book.description,
            price: book.price,
            discountPrice:book.discountPrice,
        };

        cart.books = cart.books || [];  
        cart.books = [...cart.books, bookData];

       
        await cart.save();

    } else {
        // Check if the book already exists in the cart
        let existingBook = cart.books.find((book) => {
            if(book.id == body.bookId){
                return book
            }
        });
        console.log(existingBook)

        if (existingBook) {
            // If the book already exists, increment its quantity
            const updatedBooks = cart.books.map((book) => {
                if (book.id == body.bookId) {
                    return {
                        ...book,
                        quantity: book.quantity + 1
                    };
                }
                return book;
            });
          
            cart.setDataValue('books', updatedBooks); 
     
            cart.books=[...updatedBooks]
        
            cart.totalPrice += parseFloat(existingBook.price);
            cart.totalDiscountPrice+=parseFloat(existingBook.discountPrice);
            cart.totalQuantity += 1;

            console.log("Updated cart books",cart.books)
            await cart.save();
        } else {
            
            const book = await Book.findOne({ where: { id: body.bookId } });

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
            };

            cart.books = [...cart.books, newBookData];
            cart.totalPrice += parseFloat(existingBook.price);
            cart.totalDiscountPrice+=parseFloat(existingBook.discountPrice);
            cart.totalQuantity += 1;
            await cart.save();
        }
    }

    return {
        code: HttpStatus.ACCEPTED,
        data: cart,
        message: 'Cart successfully updated',
    };
};

export const removeItem = async (body) => {
    let cart = await Cart.findOne({ where: { userId: body.userId } });

    if (!cart) {
        return {
            code: HttpStatus.BAD_REQUEST,
            data: [],
            message: 'Cart not Exit !',
        };

    } else {
        // Check if the book already exists in the cart
        let existingBook = cart.books.find((book) => {
            if(book.id == body.bookId){
                return book
            }
        });
        console.log(existingBook)

        if (existingBook) {
          
            let updatedBooks = cart.books
             .map((book) => {
              if (book.id == body.bookId) {
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


            cart.setDataValue('books', updatedBooks); 
     
            cart.books=[...updatedBooks]
        
            cart.totalPrice -= parseFloat(existingBook.price)
            cart.totalDiscountPrice-=parseFloat(existingBook.discountPrice);
            cart.totalQuantity -= 1;

            console.log("Updated cart books",cart.books)
            await cart.save();
        } else {
            
            return {
                code: HttpStatus.BAD_REQUEST,
                data: [],
                message: 'Cart book not Exit !',
            };
        }
    }

    return {
        code: HttpStatus.ACCEPTED,
        data: cart,
        message: 'Book Successfully Remove !',
    };
};




export const deleteCart = async (userId) => {
 let cart = await Cart.findOne({ where: { userId:userId } });    
  if(!cart){
    return {
        code: HttpStatus.ACCEPTED,
        data: [],
        message: 'Cart not exit',
      };

  }
  else{
    cart = await Cart.destroy({ where: { userId:userId } })
    return {
        code: HttpStatus.ACCEPTED,
        data: cart,
        message: 'Cart successfully deleted',
      };
  } 
  };
  
