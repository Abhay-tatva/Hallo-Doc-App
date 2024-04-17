import { createAsyncThunk } from "@reduxjs/toolkit";
import { PHYSICIANTRANSFER_API } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const physicianTransfer = createAsyncThunk(
  "physicianTransfer",
  async (params, { rejectWithValue }) => {
    const { description, confirmationnumber } = params;
    try {
      const response = await Axios.post(
        `${PHYSICIANTRANSFER_API.replace(":confirmation_no", confirmationnumber)}`,
        {
          description,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
