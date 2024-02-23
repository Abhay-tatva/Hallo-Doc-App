import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/loginSlice/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
