import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import {
  GETPHYSICIANMYPORFILE_API,
  PUTREQUESTTOADMIN_API,
} from "../../../constant/apis";

export const getPhysicianMyProfile = createAsyncThunk(
  "getPhysicianMyProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(GETPHYSICIANMYPORFILE_API);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const putRequestToadmin = createAsyncThunk(
  "putRequestToadmin",
  async (params, { rejectWithValue }) => {
    const { message } = params;
    console.log("params", params);
    try {
      const response = await Axios.put(PUTREQUESTTOADMIN_API);
      {
        message;
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
