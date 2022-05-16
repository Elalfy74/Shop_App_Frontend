import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  status: "",
  registerError: "",
  loginError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload.status;
      state.registerError = action.payload.registerError || "";
      state.loginError = action.payload.loginError || "";
    },
    onLoggedIn(state, action) {
      state.token = action.payload.token;
    },
    onLoggedOut(state) {
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
