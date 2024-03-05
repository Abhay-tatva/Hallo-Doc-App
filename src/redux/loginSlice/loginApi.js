import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { LOGIN_API } from "../../constant/apis";

export const userLogin = createAsyncThunk(
  "userLogin",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(LOGIN_API, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
