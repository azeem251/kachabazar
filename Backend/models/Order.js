// import mongoose from "mongoose";
// const schema = new mongoose.Schema({
//   user: { type: Object, required: true },
//   items: { type: Array, required: true },
//   total: { type: Number, required: true },
//   paymentMethod: String,
//   createdAt: { type: Date, default: Date.now },
// });
// export default mongoose.model("Order", schema);

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      price: Number,
      image: String,
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD', 'Stripe'], default: 'COD' },
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    country: String,
    zip: String
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
