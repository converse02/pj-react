import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => (acc += item.price * item.count), 0);
};

const findItem = (items, id) => {
  return items.find((item) => item.id === id);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findElement = state.items.find((item) => item.id === action.payload.id);
      if (findElement) {
        findElement.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calculateTotalPrice(state.items);
    },

    plusItem(state, action) {
      const findEl = findItem(state.items, action.payload);
      if (findEl) {
        findEl.count++;
      }

      state.totalPrice = calculateTotalPrice(state.items);
    },

    minusItem(state, action) {
      const findEl = findItem(state.items, action.payload);
      if (findEl && findEl.count > 1) {
        findEl.count--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      state.totalPrice = calculateTotalPrice(state.items);
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// For example, how create selectors. This selector will use in Header.jsx
export const selectCart = (state) => state.cart;

// This selector will use in PizzaBlock.jsx

export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;

// const items = {
//   id: {
//     params: {
//       id: 0,
//       title: 'Pizza',
//       price: 540,
//       img: 'url',
//     },
//     pizzas: [
//       { sizeId: 0, doughId: 1, count: 2 },
//       { sizeId: 1, doughId: 0, count: 1 },
//     ],
//   },
// };
