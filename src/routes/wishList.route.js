import express from 'express';
import * as wishListController from '../controllers/wishList.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
// import { verifyRole } from '../middlewares/verifyRole.middleware.js';


const router = express.Router();


router.post('/addItem', userAuth,wishListController.addItem);
router.post('/removeItem',userAuth,wishListController.removeItem);
router.delete('/deleteWishList/:id', userAuth,wishListController.deleteWishList);




export default router;
