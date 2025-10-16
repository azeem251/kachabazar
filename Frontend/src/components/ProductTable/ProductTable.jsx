import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  updateProduct as updateProductRedux,
  deleteProduct as deleteProductRedux,
} from "../../ReduxSlices/productSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
  Box
} from "@mui/material";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BACKEND_URL } from "../../utils/api";

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/products`);
      dispatch(setProducts(res.data));
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      description: product.description || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${BACKEND_URL}/api/products/${id}`);
        dispatch(deleteProductRedux(id));
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete product", "error");
        console.error("Delete failed", error.message);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      if (formData.image && typeof formData.image !== "string") {
        data.append("image", formData.image);
      }

      const res = await axios.put(
        `${BACKEND_URL}/api/products/${selectedProduct._id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      dispatch(updateProductRedux(res.data.product));
      setShowModal(false);
      Swal.fire("Success", "Product updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update product", "error");
      console.error("Update failed", error.message);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Uploaded Products</h2>

      {/* Search Input */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded px-3 py-1 w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="px-2 py-2 border">Image</th>
              <th className="px-2 py-2 border">Name</th>
              <th className="px-2 py-2 border">Price</th>
              <th className="px-2 py-2 border">Uploaded At</th>
              <th className="px-2 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-13 object-cover rounded text-center mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">₹{product.price}</td>
                  <td className="px-4 py-2 border">{formatDate(product.createdAt)}</td>
                  <td className="px-4 py-2 border space-x-2 flex gap-1">
                    <button
                      className="bg-yellow-400 text-white px-2 py-1 rounded flex items-center gap-1"
                      onClick={() => handleEditClick(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {products.length > itemsPerPage && (
        <div className="flex flex-wrap justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            )
            .map((page, idx, arr) => {
              const showDots = idx > 0 && page !== arr[idx - 1] + 1;
              return (
                <React.Fragment key={page}>
                  {showDots && <span className="px-2">...</span>}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent dividers>
            {formData.image && (
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar
                  src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)}
                  alt="Product"
                  variant="rounded"
                  sx={{ width: 120, height: 120, border: '2px solid #ccc' }}
                />
              </Box>
            )}
            <Box textAlign="center" mb={2}>
              <input
                accept="image/*"
                id="edit-upload-img"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData({ ...formData, image: file });
                  }
                }}
              />
              <label htmlFor="edit-upload-img">
                <Button variant="outlined" component="span">
                  {formData.image ? 'Change Image' : 'Upload Image'}
                </Button>
              </label>
            </Box>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="dense"
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              margin="dense"
            />
            <TextField
              label="Stock"
              type="number"
              fullWidth
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              margin="dense"
            />
            <TextField
              label="Description"
              multiline
              minRows={3}
              fullWidth
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="success" variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ProductTable;