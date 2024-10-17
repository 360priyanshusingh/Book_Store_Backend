import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator ,loginUserValidator,newPasswordValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// Route to create a new user (with validation middleware)
router.post('/signup',newUserValidator, userController.newUser);

router.post('/login',loginUserValidator, userController.loginUser);

router.post('/forgetPassword',userController.forgetFassword);

router.post('/resetPassword/:email',newPasswordValidator,userController.resetPassword);



export default router;
