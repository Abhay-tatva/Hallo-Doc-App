import { createAsyncThunk } from "@reduxjs/toolkit";
import { PHYSICIANVIEWCASE_API } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const physicianViewCase = createAsyncThunk(
  "physicianViewCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${PHYSICIANVIEWCASE_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
