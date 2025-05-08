import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createOrderAsync, getOrdersAsync, updateOrderStatus } from '../service/order.service';

const initialState = {
  isSubmitting: false,
  isLoading: false,
orderList: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,

  extraReducers: (builder) => {
    // Create order ----------
    builder.addMatcher(isAnyOf(createOrderAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(createOrderAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(createOrderAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Get orders ----------
    builder.addMatcher(isAnyOf(getOrdersAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getOrdersAsync.fulfilled), (state, {payload}) => {
      state.isLoading = false;
      state.orderList = payload?.data;
    });
    builder.addMatcher(isAnyOf(getOrdersAsync.rejected), (state) => {
      state.isLoading = false;
    });

    // Update order status ----------
    builder.addMatcher(isAnyOf(updateOrderStatus.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(updateOrderStatus.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(updateOrderStatus.rejected), (state) => {
      state.isSubmitting = false;
    });
    // -------------
  },
});

export default orderSlice.reducer;
