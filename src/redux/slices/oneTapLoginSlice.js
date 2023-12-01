import { createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";
const oneTapLogin = createSlice({
  name: "onetapLoginSlice",
  initialState: {
    email: null,
    email_verified: false,
    name: null,
    picture: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      const { email, email_verified, name, picture } = action.payload;
      if (email_verified) {
        state.email = email;
        state.email_verified = email_verified;
        state.name = name;
        state.picture = picture;
        document.cookie = `auth=${JSON.stringify(state)};path="/"`;
      }
    },
  },
});
export const { setUserDetails } = oneTapLogin.actions;
export default oneTapLogin.reducer;
