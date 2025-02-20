import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "artist" | "personalAssistant";
}

const initialState: User = {
  id: "",
  name: "",
  email: "",
  role: "buyer"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
