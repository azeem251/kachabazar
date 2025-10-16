import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  googleId: String,
  token: String,
  otp: String,
  otpExpires: Date,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  cart: [cartItemSchema]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
