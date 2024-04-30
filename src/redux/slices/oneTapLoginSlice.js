import { createSlice } from "@reduxjs/toolkit";
import { createCookie } from "../../utils/common";
import Router from "next/router";

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
    setUserDetails: (state, action, dataFrom) => {
      const { email, email_verified, name, picture, isAdmin, from } =
        action.payload;
      if (email_verified) {
        state.email = email;
        state.email_verified = email_verified;
        state.name = name;
        state.picture = picture;
        state.isAdmin = isAdmin;
        createCookie("auth", JSON.stringify(state), 2);
        if (from && from === "api") {
          Router.push("/");
        }
      }
    },
    userLogout: (state) => initialState,
    setOpenDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
  },
});

export const { setUserDetails, setOpenDrawer, userLogout } =
  oneTapLogin.actions;
export default oneTapLogin.reducer;
