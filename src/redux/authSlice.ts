import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  domain?: string;
  token: string;
}

const initialState: User = {
  id: "",
  name: "",
  email: "",
  domain: "",
  token: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.domain = action.payload.domain;
      state.token = action.payload.token;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
