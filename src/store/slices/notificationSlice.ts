import { notification } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [] as notification[],
};

export const fetchNotification = createAsyncThunk(
  "fetchNotification",
  async () => {
    try {
      const response = await axiosInstance.get("/api/notifications");
      return response?.data?.notification || [];
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }
);

export const addNotification = createAsyncThunk(
  "addNotification",
  async (data: notification) => {
    try {
      const response = await axiosInstance.post("/api/notifications", data);
      return response?.data || [];
    } catch (error) {
      console.log("Error Adding notifications:", error);
    }
  }
);

export const clearNotification = createAsyncThunk(
  "clearNotification",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete("/api/notifications", {
        data: { id },
      });
      if (response) return id;
    } catch (error) {
      console.error("Error clear notifications:", error);
    }
  }
);

export const deleteAllNotification = createAsyncThunk(
  "deleteAllNotification",
  async () => {
    try {
      const response = await axiosInstance.delete(
        "/api/deleteAllNotifications"
      );
      return response?.data || [];
    } catch (error) {
      console.error("Error Deleting notifications:", error);
    }
  }
);

const Notification = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      state.notifications = action.payload || [];
    });
    builder.addCase(addNotification.fulfilled, (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
    });
    builder.addCase(clearNotification.fulfilled, (state, action) => {
      state.notifications =
        state.notifications.filter(
          (notification) => notification.id !== action.payload
        ) || [];
    });
    builder.addCase(deleteAllNotification.fulfilled, (state) => {
      state.notifications = [];
    });
  },
});

export default Notification.reducer;
