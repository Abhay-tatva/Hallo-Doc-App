import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  CREATESHIFTPHYSICIAN,
  PHYSICIAN_API,
  REGION_API,
} from "../../constant/apis";

export const getRegions = createAsyncThunk(
  "getRegions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${REGION_API}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getPhysician = createAsyncThunk(
  "getPhysician",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${PHYSICIAN_API}?region=${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const getShiftPhysician = createAsyncThunk(
  "getShiftPhysician",
  async (params, { rejectWithValue }) => {
    console.log("object", params);
    try {
      const response = await Axios.get(
        `${CREATESHIFTPHYSICIAN}?region=${params}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
