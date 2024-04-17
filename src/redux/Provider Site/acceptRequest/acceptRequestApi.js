import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import { PUTACCEPTREQUEST } from "../../../constant/apis";

export const putAcceptRequest = createAsyncThunk(
  "putAcceptRequest",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${PUTACCEPTREQUEST.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
