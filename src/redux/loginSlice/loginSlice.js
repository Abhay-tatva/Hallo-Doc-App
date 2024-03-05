import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./loginApi";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
  token: "",
};

export const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.token) {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      }
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { loginRequest, loginFailure, logout, loginSuccess } =
  loginSlice.actions;
export default loginSlice.reducer;
