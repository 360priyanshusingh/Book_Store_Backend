import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
// import { userAuth ,adminAuth} from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post('/addItem', cartController.addItem);
router.post('/removeItem', cartController.removeItem);
router.delete('/deleteCart/:id', cartController.deleteCart);




export default router;
