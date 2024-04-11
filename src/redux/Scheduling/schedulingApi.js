/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { postCreateProvider } from "../provider/providerApi";
import {
  DELETESELECTEDSHIFT_API,
  GETPROVIDERONCALL_API,
  GETREQUESTSHIFT_API,
  PUTAPPROVEDSHIFT_API,
} from "../../constant/apis";

export const postCreateShift = createAsyncThunk(
  "postCreateShift",
  async (params, { rejectWithValue }) => {
    const {
      region,
      physician,
      shift_date,
      start,
      end,
      repeat_days,
      repeat_end,
    } = params;
    try {
      const response = await Axios.post(`${postCreateProvider}`, {
        region,
        physician,
        shift_date,
        start,
        end,
        repeat_days,
        repeat_end,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getProviderOnCall = createAsyncThunk(
  "getProviderOnCall",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${GETPROVIDERONCALL_API}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const getRequestShift = createAsyncThunk(
  "getRequestShift",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.region !== "all") newParams.region = params.region;
    try {
      const response = await Axios.get(`${GETREQUESTSHIFT_API}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const putApprovedShift = createAsyncThunk(
  "putApprovedShift",
  async (params, { rejectWithValue }) => {
    console.log("p", params);
    try {
      const response = await Axios.put(
        `${PUTAPPROVEDSHIFT_API}?shift_id=${params}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const deleteSelectedShift = createAsyncThunk(
  "deleteSelectedShift",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `${DELETESELECTEDSHIFT_API}?shift_id=${params}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
