import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name?: string;
  email: string;
  domain?: string;
}

const initialState: User = {
  id: "",
  name: "",
  email: "",
  domain: ""
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.domain = action.payload.domain;
    },
    logout: () => initialState,
    resetAuth: () => initialState,
    updateDomain: (state, action: PayloadAction<string>) => {
      state.domain = action.payload;
    }
  }
});

export const { login, logout, resetAuth, updateDomain } = authSlice.actions;
export default authSlice.reducer;
