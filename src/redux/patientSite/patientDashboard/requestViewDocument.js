import { createAsyncThunk } from "@reduxjs/toolkit";
import { REQUESTVIEWDOCUMENT } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const requestViewCase = createAsyncThunk(
  "requestViewCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${REQUESTVIEWDOCUMENT.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
