// slices/mySlice.js
import api from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching data
export const fetchData = createAsyncThunk(
  "newSlice/fetchData",
  async (options) => {
    const response = await api.get(
      `/1/news?apikey=${process.env.NEWS_API_KEY}&language=${options.lang}&image=1&category=${options.category}`
    );
    return response.data.results;
  }
);

export const fetchDataFromMDB = createAsyncThunk(
  "newSlice/fetchDataFromMDB",
  async (options) => {
    const response = await axios.get(
      `http://localhost:3000/api/newsData?language=${options.lang}&category=${options.category}`
    );
    return response.data;
  }
);
export const sendDataFromMDB = createAsyncThunk(
  "newSlice/sendDataFromMDB",
  async (data) => {
    const response = await axios.post(
      `http://localhost:3000/api/newsData`,
      data
    );
    return response.data;
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
      .addCase(sendDataFromMDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendDataFromMDB.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
      })
      .addCase(sendDataFromMDB.rejected, (state, action) => {
        state.loading = false;
        state.newsData = null;
        state.error = action.error.message;
      })
      .addCase(fetchDataFromMDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataFromMDB.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
      })
      .addCase(fetchDataFromMDB.rejected, (state, action) => {
        state.loading = false;
        state.newsData = null;
        state.error = action.error.message;
      })
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
