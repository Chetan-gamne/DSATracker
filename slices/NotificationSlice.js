import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: {
    hour: 7,
    minute: 1,
    repeats: true,
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeNotificationTime: (state, action) => {
      state.timer = { ...state.timer, ...action.payload };
    },
  },
});

export const { changeNotificationTime } = notificationSlice.actions;

export const selectNotificationTime = (state) => state.notification.timer;

export default notificationSlice.reducer;
