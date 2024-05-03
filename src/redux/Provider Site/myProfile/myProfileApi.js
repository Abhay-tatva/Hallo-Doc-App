import { createAsyncThunk } from "@reduxjs/toolkit";
import { PUTMYPROFILERESSPASS } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const putMyProfileRessPass = createAsyncThunk(
  "putMyProfileRessPass",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(PUTMYPROFILERESSPASS, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
