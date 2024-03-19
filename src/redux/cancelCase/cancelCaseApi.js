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

export const cancelCaseUpdate = createAsyncThunk(
  "cancelCaseUpdate",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${CANCELCASE_API.replace("confirmation_no", params.confirmnumber)}`,
        {
          withAuthToken: true,
          reason: params.reason,
          additional_notes: params.additional_notes,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
