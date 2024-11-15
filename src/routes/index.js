import express from 'express';
const router = express.Router();
import bookRoute from './book.route'
import userRoute from './user.route'
import cartRoute from './cart.route'
import wishListRoute from './wishList.route'
import orderRoute from './order.route'
import customerRoute from './customerDetails.route'

/**
 * Function contains Application routes
 *
 * @returns router
 */

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  
  router.use('/users', userRoute);
  router.use('/books', bookRoute);
  router.use('/cart', cartRoute);
  router.use('/wishList', wishListRoute);
  router.use('/order', orderRoute);
  router.use('/customer', customerRoute);

  return router;
};

export default routes;
