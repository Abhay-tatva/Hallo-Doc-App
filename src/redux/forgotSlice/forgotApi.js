import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { FORGOTPASS_API } from "../../constant/apis";

export const forgotPass = createAsyncThunk(
  "forgotPass",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(FORGOTPASS_API, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
