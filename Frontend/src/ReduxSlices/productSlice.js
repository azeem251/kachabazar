


import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
  },
  reducers: {
     addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    setProducts: (state, action) => {
      state.list = action.payload;
    },
    updateProduct: (state, action) => {
      const index = state.list.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter(p => p._id !== action.payload);
      
    },
  },
});

export const { setProducts, updateProduct, deleteProduct ,addProduct} = productSlice.actions;
export default productSlice.reducer;
