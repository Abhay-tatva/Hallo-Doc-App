import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { REQUESTCOUNT_API } from "../../constant/apis";

export const requestCount = createAsyncThunk(
  "requestCount",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(REQUESTCOUNT_API, {
        withAuthToken: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
