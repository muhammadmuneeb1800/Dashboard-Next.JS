import { showToast } from "@/components/toast/Toast";
import { initialAuth, updatePasswordData, userCreateData } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState = {
  user: {} as initialAuth,
  isLoading: false,
  error: null as string | null,
};

export const createUser = createAsyncThunk(
  "createUser",
  async (data: userCreateData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/register", data);
      return response?.data?.user || {};
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return rejectWithValue("Email already exists");
      }
      return rejectWithValue(error);
    }
  }
);

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
    builder
      .addCase(userAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "User authentication failed";
      })

      .addCase(userEdit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userEdit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userEdit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "User edit failed";
      });
  },
});

export default Authentication.reducer;
