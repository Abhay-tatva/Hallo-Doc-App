import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { VIEWCASE_API } from "../../constant/apis";

export const viewCase = createAsyncThunk(
  "viewCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${VIEWCASE_API.replace(":confirmation_no", params)}`,
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
