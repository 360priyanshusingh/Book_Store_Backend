import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator ,loginUserValidator,newPasswordValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { addRole } from '../middlewares/addRole.middleware';

const router = express.Router();

// Route to create a new user (with validation middleware)
router.post('/signup',newUserValidator,addRole, userController.newUser);

router.post('/signupAdmin',newUserValidator,addRole,userController.newAdmin);

router.post('/login',loginUserValidator, userController.loginUser);

// router.post('/loginAdmin',loginUserValidator, userController.loginAdmin);

router.post('/forgetPassword',userController.forgetFassword);

router.post('/resetPassword/:email',newPasswordValidator,userController.resetPassword);



export default router;
