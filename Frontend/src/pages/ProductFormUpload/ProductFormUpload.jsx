import React, { useState } from 'react';
import {
  Box, Button, TextField, MenuItem, Select, InputLabel,
  FormControl, Typography, Avatar, IconButton, CircularProgress
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../ReduxSlices/productSlice';
import { BACKEND_URL } from '../../utils/api';

import DeleteIcon from '@mui/icons-material/Delete';
const emerald = "#10b981";
const menuItems = [
  { label: "Fish & Meat", submenu: ["Fish", "Meat"] },
  { label: "Fruits & Vegetables", submenu: ["Fruits", "Vegetables"] },
  { label: "Cooking Essentials", submenu: ["Flour", "Oil"] },
  { label: "Biscuits & Cakes", submenu: ["Biscuits", "Cakes"] },
  { label: "Household Tools", submenu: ["Water Filter", "Cleaner Tools"] },
  { label: "Pet Care", submenu: ["Dog Care", "Cat Care"] },
  { label: "Milks & Dairy", submenu: ["Butter & Ghee", "Ice Cream"] },
  { label: "Drinks", submenu: ["Tea", "Water", "Juice", "Coffee", "Energy Drinks"] },
];

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  price: Yup.number().required("Price is required").positive(),
  stock: Yup.number().required("Stock is required").min(1),
  category: Yup.string().required("Category is required"),
  subcategory: Yup.string().required("Subcategory is required"),
    description: Yup.string().required("Description is required").min(10),
});

const ProductFormUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      stock: '',
      category: '',
      subcategory: '',
      description:""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => { 
      if (!image) {
        return Swal.fire("Upload Required", "Please upload a product image", "warning");
      }

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, value));
      formData.append('image', image);

      setLoading(true);
      try {

        const res = await axios.post(`${BACKEND_URL}/api/products/add`, formData);
        Swal.fire("Success!", "Product Added successfully!", "success");
        dispatch(addProduct({ ...values, image: res.data.image }));
        resetForm();
        setImage(null);
        setPreview(null);
        console.log(res)
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to upload product", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      {/* Camera icon top center */}
      {!preview && (
        <Box textAlign="center" mb={2}>
          <input accept="image/*" id="upload-img" type="file" style={{ display: 'none' }} onChange={handleImageChange} />
          <label htmlFor="upload-img">
            <IconButton color="primary" component="span"
              sx={{
                backgroundColor: '#f0f0f0',
                border: '2px solid #ccc',
                '&:hover': { backgroundColor: '#e0e0e0' }
              }}>
              <PhotoCamera />
            </IconButton>
          </label>
          <Typography variant="body2" mt={1}>Upload Product Image</Typography>
        </Box>
      )}

      {/* Preview avatar after image is uploaded */}
      {preview && (
        <div className='mx-auto'>
          <Box display="flex" justifyContent="center" mt={0} mb={2}>
            <Box
              position="relative"
              sx={{ '&:hover .delete-btn': { display: 'flex' } }}
            >
              <Avatar
                src={preview}
                alt="Preview"
                variant="rounded"
                sx={{
                  width: 90,
                  height: 90,
                  border: '2px solid #ccc',
                }}
              />

              <IconButton
                onClick={handleRemoveImage}
                size="small"
                className="delete-btn"
                sx={{
                  display: 'none',
                  position: 'absolute',
                  top: -9,
                  right: -15,
                  color: 'white',
                  backgroundColor: 'red',
                  border: '1px solid #ccc',
                  '&:hover': { backgroundColor: '#f44336', color: '#fff' },
                  zIndex: 1
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

        </div>

      )}

      <Typography variant="h5" fontWeight="bold" mb={3} align="center">Add New Product</Typography>

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <TextField name="name" label="Product Name" fullWidth margin="normal"
          value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: emerald } }}
        />

        <TextField name="price" label="Price" type="number" fullWidth margin="normal"
          value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: emerald } }}
        />

        <TextField name="stock" label="Stock" type="number" fullWidth margin="normal"
          value={formik.values.stock} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
          sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: emerald } }}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select name="category" value={formik.values.category} onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldValue("subcategory", "");
          }} label="Category"
            error={formik.touched.category && Boolean(formik.errors.category)}
            onBlur={formik.handleBlur}
            sx={{ '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: emerald } }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.label} value={item.label}>{item.label}</MenuItem>
            ))}
          </Select>
          {formik.touched.category && formik.errors.category && (
            <Typography variant="caption" color="error">{formik.errors.category}</Typography>
          )}
        </FormControl>

        {formik.values.category && (
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Subcategory</InputLabel>
            <Select name="subcategory" value={formik.values.subcategory} onChange={formik.handleChange}
              onBlur={formik.handleBlur} label="Subcategory"
              error={formik.touched.subcategory && Boolean(formik.errors.subcategory)}
              sx={{ '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: emerald } }}
            >
              {menuItems.find(cat => cat.label === formik.values.category)?.submenu.map(sub => (
                <MenuItem key={sub} value={sub}>{sub}</MenuItem>
              ))}
            </Select>
            {formik.touched.subcategory && formik.errors.subcategory && (
              <Typography variant="caption" color="error">{formik.errors.subcategory}</Typography>
            )}
            
          </FormControl>
        )}
        <TextField
  name="description"
  label="Product Description"
  fullWidth
  margin="normal"
  multiline
  rows={4}
  value={formik.values.description}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.description && Boolean(formik.errors.description)}
  helperText={formik.touched.description && formik.errors.description}
  sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: emerald } }}
/>

        <Box mt={2} textAlign="center">
          <Button type="submit" variant="contained" sx={{
            backgroundColor: emerald,
            '&:hover': { backgroundColor: '#0f9668' }
          }} disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Upload Product'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductFormUpload;
