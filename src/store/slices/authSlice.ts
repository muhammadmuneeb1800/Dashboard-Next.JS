import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: 'hello world',
};

const Authentication = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    setState:(state,action)=>{
      state.user = action.payload || {};

    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    
  },
});

export const { setState, setUser, logout } = Authentication.actions;

export default Authentication.reducer;
