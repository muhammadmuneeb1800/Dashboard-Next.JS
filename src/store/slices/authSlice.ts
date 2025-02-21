import { initialAuth } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as initialAuth,
};

export const userAuth = createAsyncThunk("userAuth", async () => {
  try {
    const user = await axiosInstance.get("/api/login-user");
    const Data = user.data || {};
    return Data;
  } catch (error) {
    console.log("errro to fetch login user",error);
  }
});



export const userEdit = createAsyncThunk(
  "userEditProfile",
  async (data: initialAuth) => {
    try {
      const response = await axiosInstance.put(`/api/login-user`, data);
      console.log("response from userEditProfile", response);
      return response?.data || [];
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
  },
});

export default Authentication.reducer;
