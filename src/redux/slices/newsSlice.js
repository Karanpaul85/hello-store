// slices/mySlice.js
import api from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Async thunk for fetching data
export const fetchData = createAsyncThunk(
  "newSlice/fetchData",
  async (options) => {
    const response = await api.get(
      `/1/news?apikey=pub_30553943e4fa640b3256ae5087619b2dede08&language=${options.lang}&image=1&category=${options.category}`
    );
    return response.data.results;
  }
);

const newSlice = createSlice({
  name: "newSlice",
  initialState: {
    newsData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setNewsData: (state, action) => {
      state.newsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add extra reducers for handling the async action
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.newsData = null;
        state.error = action.error.message;
      });
  },
});
export const { setNewsData } = newSlice.actions;
export default newSlice.reducer;
