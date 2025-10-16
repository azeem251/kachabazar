// app/store.js
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '.../ReduxSlices/authSlice';
import authReducer from './ReduxSlices/authSlice'
import productReducer from './ReduxSlices/productSlice';
import singleProductReducer from './ReduxSlices/singleProductSlice';
import cartReducer from './ReduxSlices/cartSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
     products: productReducer,
      singleProduct: singleProductReducer,
      cart: cartReducer,
  },
});
export default store;
