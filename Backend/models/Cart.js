import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  // स्टब यूजर id
  const userCart = await Cart.findOne({ userId: req.body.userId });
  res.json({ items: userCart ? userCart.items : [] });
};