// controllers/productController.js
import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import { error } from 'console';

export const addProduct = async (req, res) => {
  try {
    const { name, price, stock, category, subcategory, description } = req.body;

    // ✅ Validate image file
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // ✅ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // remove temporary file

    // ✅ Create and save product
    const product = new Product({
      name,
      price,
      stock,
      category,
      subcategory,
      description,
      image: result.secure_url,
    });

    await product.save();

    res.status(201).json({
      message: 'Product added successfully',
      product,
    });

  } catch (error) {
    console.error("Product Upload Error:", error);
    res.status(500).json({
      message: 'Failed to add product',
      error: error.message,
    });
  }
};

// export const getProductsByCategory = async (req, res) => {
//   try {
//     const { category, subcategory } = req.query;

//     const query = {};
//     if (category) query.category =  new RegExp(category, 'i');;
//     if (subcategory) query.subcategory = subcategory;

//     const products = await Product.find(query);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

export const getProductsByCategory = async (req, res) => {
  try {
    const { category, subcategory } = req.query;

    const query = {};
    if (category) query.category = new RegExp(category, 'i');
    if (subcategory) query.subcategory = new RegExp(subcategory, 'i'); // 🔥 FIXED

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};





export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;

    const updateData = { name, price, stock, description }; // ✅ Add description here

    // ✅ If image is being updated
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path); // remove temp file
      updateData.image = result.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: updated });

  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { name, id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // ✅ Optional: Name check for extra validation
    if (product.name.replace(/\s+/g, '-').toLowerCase() !== name.toLowerCase()) {
      return res.status(400).json({ message: 'Product name does not match the URL' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};





// search produt by qurey input
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const searchRegex = new RegExp(q, 'i');

    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { category: searchRegex },
        { subcategory: searchRegex }
      ]
    });
    if (products.length === 0) {
      return res.status(404).json({
        message: "product not found",
        error: true,
        success: false,
        data: []

      })
    }
    res.status(200).json({
      message: "product search sucessfully",
      error: false,
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: true, success: false });
  }
};
