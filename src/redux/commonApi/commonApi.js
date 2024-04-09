import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { COMMON_API } from "../../constant/apis";

export const commonApi = createAsyncThunk(
  "commonApi",
  async (params, { rejectWithValue }) => {
    console.log("heieieiie", params);
    try {
      const response = await Axios.get(
        `${COMMON_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
