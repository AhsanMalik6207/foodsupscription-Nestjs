import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import paymentReducer from "./paymentRedux";
import paidinvoiceReducer from "./paidinvoiceRedux";
import adminReducer from "./adminRedux";
import weeklymenuReducer from "./weeklymenuRedux";
export default configureStore({
  reducer: {
    user: userReducer,
    payment:paymentReducer,
    paidinvoice: paidinvoiceReducer,
    admin: adminReducer,
    weeklymenu: weeklymenuReducer,
  },
});