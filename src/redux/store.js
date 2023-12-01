// store.js
import { configureStore } from "@reduxjs/toolkit";
import newSlice from "../redux/slices/newsSlice";
import searchSlice from "../redux/slices/searchSlice";
import oneTapLogin from "../redux/slices/oneTapLoginSlice";

const store = configureStore({
  reducer: {
    newSlice,
    searchSlice,
    oneTapLogin,
  },
});

export default store;
