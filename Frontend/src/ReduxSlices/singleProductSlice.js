// src/redux/singleProductSlice.js
import { createSlice } from '@reduxjs/toolkit';

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    data: null,
  },
  reducers: {
    setSingleProduct: (state, action) => {
      state.data = action.payload;
    },
    clearSingleProduct: (state) => {
      state.data = null;
    },
  },
});

export const { setSingleProduct, clearSingleProduct } = singleProductSlice.actions;
export default singleProductSlice.reducer;
