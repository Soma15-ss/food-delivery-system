import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loginAsync, register } from '../service/auth.service';

const initialState = {
  isSubmitting: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: (builder) => {
    // Register user ----------
    builder.addMatcher(isAnyOf(register.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(register.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(register.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Login user ----------
    builder.addMatcher(isAnyOf(loginAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(loginAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(loginAsync.rejected), (state) => {
      state.isSubmitting = false;
    });
    // -------------
  },
});

export default authSlice.reducer;
