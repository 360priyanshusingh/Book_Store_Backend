import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { verifyRole } from '../middlewares/verifyRole.middleware.js';


const router = express.Router();


router.post('/addItem/:id', userAuth,cartController.addItem);

router.post('/updateQuantity/:id', userAuth,cartController.updateQuantity);

router.post('/removeItem/:id',userAuth,cartController.removeItem);

router.delete('/deleteItem/:id',userAuth,cartController.deleteItem);

router.delete('/deleteCart/:id', userAuth,cartController.deleteCart);

router.get('/getCartById', userAuth,cartController.getCartById);


export default router;
