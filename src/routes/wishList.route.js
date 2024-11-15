import express from 'express';
import * as wishListController from '../controllers/wishList.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
// import { verifyRole } from '../middlewares/verifyRole.middleware.js';


const router = express.Router();


router.post('/addItem/:id', userAuth,wishListController.addItem);
router.post('/removeItem/:id',userAuth,wishListController.removeItem);
router.delete('/deleteWishList/:id', userAuth,wishListController.deleteWishList);
router.get('/getWishList', userAuth,wishListController.getWishList);
router.delete('/deleteItem/:id', userAuth,wishListController.deleteItem);



export default router;
