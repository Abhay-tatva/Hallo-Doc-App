import { createAsyncThunk } from "@reduxjs/toolkit";
import { PUTAGREEMENT } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const agreement = createAsyncThunk(
  "agreement",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${PUTAGREEMENT.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
