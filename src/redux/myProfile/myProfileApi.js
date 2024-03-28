import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { GETMYPROFILE_API } from "../../constant/apis";

export const getMyProfile = createAsyncThunk(
  "getMyProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(GETMYPROFILE_API, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
