import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { CANCELCASE_API } from "../../constant/apis";

export const cancelCase = createAsyncThunk(
  "cancelCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${CANCELCASE_API.replace(":confirmation_no", params)}`,
        {
          withAuthToken: true,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
