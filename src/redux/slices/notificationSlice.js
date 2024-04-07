import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  notificationData: null,
};

const notification = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setNotificationData: (state, action) => {
      state.notificationData = action.payload;
    },
  },
});

export const { setNotificationData } = notification.actions;
export default notification.reducer;
