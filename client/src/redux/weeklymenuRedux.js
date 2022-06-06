import { createSlice } from "@reduxjs/toolkit";
const weeklymenuSlice = createSlice({
  name: "weeklymenu",
  initialState: {
    currentWeeklymenu: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    weeklymenuStart: (state) => {
      state.isFetching = true;
    },
    weeklymenuSuccess: (state, action) => {
      state.isFetching = false;
      state.currentWeeklymenu = action.payload;
      state.error=false;
    },
    weeklymenuFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentWeeklymenu=null;
    },
  },
});

export const { weeklymenuStart, weeklymenuSuccess, weeklymenuFailure} = weeklymenuSlice.actions;
export default weeklymenuSlice.reducer;