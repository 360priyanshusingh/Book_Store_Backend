import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { verifyRole } from '../middlewares/verifyRole.middleware.js';


const router = express.Router();


router.post('/addItem', userAuth,cartController.addItem);
router.post('/removeItem',userAuth,cartController.removeItem);
router.delete('/deleteCart/:id', userAuth,cartController.deleteCart);




export default router;
