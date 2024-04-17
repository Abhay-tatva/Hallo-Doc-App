import { createAsyncThunk } from "@reduxjs/toolkit";
import { PHYSICIANVIEWNOTES_API } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const physicianViewNotes = createAsyncThunk(
  "physicianViewNotes",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${PHYSICIANVIEWNOTES_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
