import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { PHYSICIAN_API, REGION_API } from "../../constant/apis";

export const getRegions = createAsyncThunk(
  "getRegions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${REGION_API}`, {
        withAuthToken: true,
      });
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
      const response = await Axios.get(`${PHYSICIAN_API}?region=${params}`, {
        withAuthToken: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
