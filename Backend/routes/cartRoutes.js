import express from 'express';
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart
} from '../controllers/cartController.js';
// import  authMiddleware  from '../middlewares/authMiddleware.js'
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/add', verifyToken, addToCart);
router.put('/update', verifyToken, updateCartQuantity);
router.delete('/remove/:productId', verifyToken, removeFromCart);

export default router;
