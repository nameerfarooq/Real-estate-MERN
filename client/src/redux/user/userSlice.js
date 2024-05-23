import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStarted: (state) => {
      state.error = null;
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    deleteUserFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    SignOutUserStarted: (state) => {
      state.error = null;
      state.loading = true;
    },
    SignOutUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    SignOutUserFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStarted,
  deleteUserFailed,
  deleteUserSuccess,
  SignOutUserFailed,
  SignOutUserStarted,
  SignOutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
