import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCookie } from "../../utils/common";
import axios from "axios";

// Async thunk for fetching data
export const sendUserDetails = createAsyncThunk(
  "onetapLoginSlice/sendUserDetails",
  async (options) => {
    const savedData = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      options
    );
    return savedData.data;
  }
);

const initialState = {
  email: null,
  email_verified: false,
  name: null,
  picture: null,
  openDrawer: false,
};

const oneTapLogin = createSlice({
  name: "onetapLoginSlice",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { email, email_verified, name, picture } = action.payload;
      if (email_verified) {
        state.email = email;
        state.email_verified = email_verified;
        state.name = name;
        state.picture = picture;
        createCookie("auth", JSON.stringify(state), 2);
      }
    },
    userLogout: (state) => initialState,
    setOpenDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendUserDetails.fulfilled, (state, action) => {
      const { email, email_verified, name, picture } = action.payload;
      if (email_verified) {
        state.email = email;
        state.email_verified = email_verified;
        state.name = name;
        state.picture = picture;
        createCookie("auth", JSON.stringify(state), 2);
      }
    });
  },
});

export const { setUserDetails, setOpenDrawer, userLogout } =
  oneTapLogin.actions;
export default oneTapLogin.reducer;
