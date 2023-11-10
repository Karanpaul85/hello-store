// store.js
import { configureStore } from '@reduxjs/toolkit';
import newSlice from '../redux/slices/newsSlice';

const store = configureStore({
  reducer: {
    newSlice,
  },
});

export default store;
