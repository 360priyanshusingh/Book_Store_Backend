import express from 'express';
import * as customerDetailsController from '../controllers/customerDetails.controller'
import { userAuth } from '../middlewares/auth.middleware.js';



const router = express.Router();


router.post('/createCustomerDetails', userAuth,customerDetailsController.createCustomerDetails);
router.put('/updateCustomerDetails/:id', userAuth,customerDetailsController.updateCustomerDetails);
router.get('/getCustomerDetails', userAuth,customerDetailsController.getCustomerDetails);





export default router;
