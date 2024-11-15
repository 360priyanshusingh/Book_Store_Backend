import express from 'express';
import * as orderController from '../controllers/order.controller.js'
import { userAuth } from '../middlewares/auth.middleware.js';



const router = express.Router();


router.post('/createOrder', userAuth,orderController.createOrder);
router.get('/getOrder',userAuth,orderController.getOrder);
// router.delete('/deleteCart/:id', userAuth,cartController.deleteCart);




export default router;
