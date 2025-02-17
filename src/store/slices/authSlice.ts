import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialAuth } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as initialAuth,
};

export const userAuth = createAsyncThunk("userAuth", async () => {
  try {
    const currentUser = await auth();
    if (currentUser) {
      const user = await prisma.user.findUnique({
        where: { email: currentUser.user?.email as string },
      });
      return user;
    }
  } catch (error) {
    console.log(error);
  }
});

const Authentication = createSlice({
  name: "Authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userAuth.fulfilled, (state, action) => {
      state.user.id = action.payload?.id;
      state.user.userName = action.payload?.name;
      state.user.email = action.payload?.email;
      state.user.companyName = action.payload?.companyName;
    });
  },
});

export default Authentication.reducer;
