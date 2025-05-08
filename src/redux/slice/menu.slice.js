import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { deleteMenuAsync, getAllMenuAsync, postMenuAsync, updateMenuAsync } from '../service/menu.service';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  menuList: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,

  extraReducers: (builder) => {
    // Get All Menus ----------
    builder.addMatcher(isAnyOf(getAllMenuAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getAllMenuAsync.fulfilled), (state, {payload}) => {
      state.isLoading = false;
      state.menuList = payload?.data;
    });
    builder.addMatcher(isAnyOf(getAllMenuAsync.rejected), (state) => {
      state.isLoading = false;
      state.menuList = [];
    });

    // Add Menu ----------
    builder.addMatcher(isAnyOf(postMenuAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(postMenuAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(postMenuAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Update Menu ----------
    builder.addMatcher(isAnyOf(updateMenuAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(updateMenuAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(updateMenuAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Delete Menu ----------
    builder.addMatcher(isAnyOf(deleteMenuAsync.pending), (state) => {
      state.isDeleting = true;
    });
    builder.addMatcher(isAnyOf(deleteMenuAsync.fulfilled), (state) => {
      state.isDeleting = false;
    });
    builder.addMatcher(isAnyOf(deleteMenuAsync.rejected), (state) => {
      state.isDeleting = false;
    });
    // -------------
  },
});

export default menuSlice.reducer;
