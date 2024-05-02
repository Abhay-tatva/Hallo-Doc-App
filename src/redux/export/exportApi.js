import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  EXPORTALL_API,
  EXPORTRECORD_API,
  SINGLEEXPORT_API,
} from "../../constant/apis";

export const singleExport = createAsyncThunk(
  "singleExport",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${SINGLEEXPORT_API}?state=${params}`, {
        responseType: "blob",
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const exportAll = createAsyncThunk(
  "exportAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${EXPORTALL_API}`, {
        responseType: "blob",
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const exportRecord = createAsyncThunk(
  "exportRecord",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${EXPORTRECORD_API}`, {
        responseType: "blob",
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
