// store.js
import { configureStore } from "@reduxjs/toolkit";
import newSlice from "../redux/slices/newsSlice";
import searchSlice from "../redux/slices/searchSlice";

const store = configureStore({
  reducer: {
    newSlice,
    searchSlice,
  },
});

export default store;
