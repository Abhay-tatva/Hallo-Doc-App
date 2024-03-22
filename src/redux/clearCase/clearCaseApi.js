import { createAsyncThunk } from "@reduxjs/toolkit";
import { CLEARCASE_API } from "../../constant/apis";
import Axios from "../../Config/axios";

export const clearCase = createAsyncThunk(
  "clearCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `${CLEARCASE_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
