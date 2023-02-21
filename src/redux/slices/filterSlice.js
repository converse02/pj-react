import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterIndex: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterIndex: (state, action) => {
      state.filterIndex = action.payload;
    },
  },
});

console.log('slice', filterSlice);
console.log('actions', filterSlice.actions);
console.log('reducer', filterSlice.reducer);

export const { setFilterIndex } = filterSlice.actions;

export default filterSlice.reducer;
