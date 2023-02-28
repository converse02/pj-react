import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  filterIndex: 0,
  pageCount: 1,
  sort: 'rating',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterIndex: (state, action) => {
      state.filterIndex = action.payload;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },

    setSortType: (state, action) => {
      state.sort = action.payload;
    },

    setFilters: (state, action) => {
      state.pageCount = Number(action.payload.page);
      state.filterIndex = Number(action.payload.categoryId);
      state.sort = action.payload.sortId;
    },
  },
});

export const { setFilterIndex, setSortType, setPageCount, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
