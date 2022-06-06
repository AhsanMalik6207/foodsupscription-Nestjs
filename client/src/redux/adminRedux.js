import { createSlice } from "@reduxjs/toolkit";
const currentAdmin=localStorage.getItem("currentAdmin") ? JSON.parse(localStorage.getItem("currentAdmin")):null;
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: currentAdmin,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentAdmin = action.payload;
      state.error=false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentAdmin=null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = adminSlice.actions;
export default adminSlice.reducer;