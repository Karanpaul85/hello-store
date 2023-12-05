import { createSlice } from "@reduxjs/toolkit";

function createCookie(MembershipIdName, MembershipID, minutes) {
  let expires;
  if (minutes) {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    expires = `; expires=${date.toGMTString()}`;
  } else {
    expires = "";
  }
  document.cookie = `${MembershipIdName}=${MembershipID}${expires}; path=/`;
}
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
});
export const { setUserDetails, setOpenDrawer, userLogout } =
  oneTapLogin.actions;
export default oneTapLogin.reducer;
