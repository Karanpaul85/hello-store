import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    showSearch: false,
    loading: false,
    error: null,
  },
  reducers: {
    showSearchSec: (state, action) => {
      state.showSearch = action.payload;
    },
  },
});
export const { showSearchSec } = searchSlice.actions;
export default searchSlice.reducer;
