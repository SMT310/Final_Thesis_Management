import { configureStore } from "@reduxjs/toolkit";
import accountsSlices from "./accountsSlice";

const store = configureStore({
  reducer: {
    account: accountsSlices.reducer,
  },
});

export default store;
