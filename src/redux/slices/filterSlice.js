import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterIndex: 0,
  sort: 'rating',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterIndex: (state, action) => {
      state.filterIndex = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setFilterIndex, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
