import { initialAppointment } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [] as initialAppointment[],
};
const Notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notifications = action.payload;
    },
    clearNotification: (state) => {
      state.notifications = [];
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { setNotification } = Notification.actions;
export default Notification.reducer;
