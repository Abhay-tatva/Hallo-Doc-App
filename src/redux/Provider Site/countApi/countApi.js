import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROVIDERSITECOUNT_API } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const physicianCount = createAsyncThunk(
  "physicianCount",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(PROVIDERSITECOUNT_API);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
