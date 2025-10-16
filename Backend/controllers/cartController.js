import User from '../models/User.js';
import Product from '../models/Product.js';

// ✅ Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const existingItem = user.cart.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }

    await user.save();
    res.status(200).json({ message: 'Item added to cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
};

// ✅ Get cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ items: user.cart || [] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
};

// ✅ Update quantity
export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cart.find(i => i.productId.equals(productId));
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity = quantity;
    await user.save();
    res.status(200).json({ message: 'Quantity updated', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error updating quantity', error: err.message });
  }
};

// ✅ Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(item => !item.productId.equals(productId));
    await user.save();
    res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item', error: err.message });
  }
};
