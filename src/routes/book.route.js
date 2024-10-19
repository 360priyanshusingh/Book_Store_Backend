import express from 'express';
import * as bookController from '../controllers/book.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { verifyRole } from '../middlewares/verifyRole.middleware.js';
// import { newUserValidator ,loginUserValidator,newPasswordValidator } from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// Route to create a new user (with validation middleware)
router.post('/createBook',userAuth,verifyRole,bookController.createBook);

router.put('/updateBook/:id',userAuth,verifyRole, bookController.updateBook);

router.get('/getAllBook', bookController.getAllBook);

router.get('/getAllBookById/:id', bookController.getAllBookById);

router.delete('/deleteBook/:id',userAuth,verifyRole, bookController.deleteBook);



export default router;
