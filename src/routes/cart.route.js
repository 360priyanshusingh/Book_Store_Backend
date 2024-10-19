import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { userAuth ,adminAuth} from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post('/createCart', cartController.createCart);




export default router;
