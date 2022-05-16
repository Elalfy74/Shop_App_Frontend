import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  status: "",
  error: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setStatus(state, status) {
      state.status = status;
    },
    replaceCart(state, action) {
      state.data.items = action.payload.items;
      state.data.totalQuantity = action.payload.totalQuantity;
      state.data.totalPrice = action.payload.totalPrice;
    },
    increaseItem(state, action) {
      const itemIndex = state.data.items.findIndex(
        (item) => item._id === action.payload._id
      );
      const item = state.data.items[itemIndex];

      if (item) {
        state.data.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.data.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }

      state.data.totalQuantity += action.payload.quantity;
      state.data.totalPrice += action.payload.quantity * action.payload.price;
    },
    decreaseItem(state, action) {
      const itemIndex = state.data.items.findIndex(
        (item) => item._id === action.payload._id
      );
      const item = state.data.items[itemIndex];

      if (item.quantity !== 1) {
        state.data.items[itemIndex].quantity--;
      } else {
        state.data.items = state.data.items.filter(
          (item) => item._id !== action.payload._id
        );
      }

      state.data.totalQuantity--;
      state.data.totalPrice -= item.price;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
