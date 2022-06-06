import { createSlice } from "@reduxjs/toolkit";
const paidinvoiceSlice = createSlice({
  name: "paidinvoice",
  initialState: {
    currentPaidinvoice: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    paidinvoiceStart: (state) => {
      state.isFetching = true;
    },
    paidinvoiceSuccess: (state, action) => {
      state.isFetching = false;
      state.currentPaidinvoice = action.payload;
      state.error=false;
    },
    paidinvoiceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentPaidinvoice=null;
    },
  },
});

export const { paidinvoiceStart, paidinvoiceSuccess, paidinvoiceFailure} = paidinvoiceSlice.actions;
export default paidinvoiceSlice.reducer;