import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSearchData = createAsyncThunk(
  "searchSlice/fetchSearchData",
  async (options) => {
    const response = await api.get(
      `/1/news?apikey=pub_30553943e4fa640b3256ae5087619b2dede08&language=${options.lang}&q=${options.q}&category=top`
    );
    return response.data.results;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    newsData: null,
    showSearch: false,
    loading: false,
    error: null,
    showlang: false,
  },
  reducers: {
    showSearchSec: (state, action) => {
      state.showSearch = action.payload;
    },
    showLangSec: (state, action) => {
      state.showlang = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add extra reducers for handling the async action
    builder
      .addCase(fetchSearchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.loading = false;
        state.newsData = null;
        state.error = action.error.message;
      });
  },
});
export const { showSearchSec, showLangSec } = searchSlice.actions;
export default searchSlice.reducer;
