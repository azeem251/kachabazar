import mongoose from 'mongoose';
import slugify from 'slugify'; // ✅ install this if not: npm install slugify

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
 
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

// ✅ Pre-save middleware to generate slug
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
