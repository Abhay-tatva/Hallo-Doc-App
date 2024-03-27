import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { COMMONBUSINESS_API, COMMONPROFESSION_API } from "../../constant/apis";

export const sendOrderProfession = createAsyncThunk(
  "sendOrderProfession",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${COMMONPROFESSION_API}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const sendOrderBussiness = createAsyncThunk(
  "sendOrderBussiness",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${COMMONBUSINESS_API}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
