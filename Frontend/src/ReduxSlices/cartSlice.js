import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
   removeFromCart: (state, action) => {
  const idToRemove = action.payload;
  state.items = state.items.filter(item =>
    item.productId !== idToRemove && item._id !== idToRemove && item.id !== idToRemove
  );
},
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product && quantity > 0) {
        product.quantity = quantity;
      }
    },
    updatePrice: (state, action) => {
      const { productId, newQuantity, newPrice } = action.payload;
  const item = state.items.find(
    item => item.productId === productId || item.id === productId || item._id === productId
  );
  if (item) {
    item.quantity = newQuantity;
    item.price = newPrice;
  }
    },
  },
});

export const {
  setCartItems,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateCartItemQuantity,
  updatePrice: updateCartItemPrice
} = cartSlice.actions;

export default cartSlice.reducer;
