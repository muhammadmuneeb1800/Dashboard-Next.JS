import { showToast } from "@/components/toast/Toast";
import { initialAuth, updatePasswordData } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as initialAuth,
};

export const userAuth = createAsyncThunk("userAuth", async () => {
  try {
    const user = await axiosInstance.get("/api/login-user");
    const Data = user?.data?.user || {};
    return Data;
  } catch (error) {
    console.log("errro to fetch login user", error);
  }
});

export const userEdit = createAsyncThunk(
  "userEditProfile",
  async (data: initialAuth) => {
    try {
      const response = await axiosInstance.put(`/api/login-user`, data);
      return response?.data?.user || {};
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "updatePassword",
  async (data: updatePasswordData) => {
    try {
      const response = await axiosInstance.put("/api/update-password", data);
      if (response.status === 401) {
        showToast("error", "Old password is required");
        return;
      }
      if (response.status === 402) {
        showToast("error", "Incorrect password provided");
        return;
      }
      return response?.data || {};
    } catch (error) {
      console.log(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (data: { token: string; password: string }) => {
    try {
      const res = await axiosInstance.post("/api/reset-password", data);
      if (res.status === 402) {
        showToast("error", "User not found");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const Authentication = createSlice({
  name: "Authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userAuth.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(userEdit.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default Authentication.reducer;
