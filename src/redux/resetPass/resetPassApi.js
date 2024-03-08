import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { RESETPASS_API } from "../../constant/apis";

export const resetPassApi = createAsyncThunk(
  "resetPass",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(RESETPASS_API, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
