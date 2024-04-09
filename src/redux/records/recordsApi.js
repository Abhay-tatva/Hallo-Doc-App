/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../Config/axios";
import {
  DELETESEARCHRECORD_API,
  GETBLOCKHISTORY_API,
  GETPATIENRECORDS_API,
  GETPATIENTHISTORY_API,
  GETSEARCHRECORD_API,
} from "../../constant/apis";

export const getPatientHistory = createAsyncThunk(
  "getPatientHistory",
  async (params, { rejectWithValue }) => {
    const { page, page_size } = params;
    try {
      const response = await Axios.get(
        `${GETPATIENTHISTORY_API}?page=${page}&page_size=${page_size}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const getPatientRecords = createAsyncThunk(
  "getPatientRecords",
  async (params, { rejectWithValue }) => {
    const { page, page_size } = params;
    try {
      const response = await Axios.get(
        `${GETPATIENRECORDS_API}?page=${page}&page_size=${page_size}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const getSearchRecords = createAsyncThunk(
  "getSearchRecords",
  async (params, { rejectWithValue }) => {
    const { page, page_size } = params;
    try {
      const response = await Axios.get(
        `${GETSEARCHRECORD_API}?page=${page}&page_size=${page_size}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const deleteSearchRecords = createAsyncThunk(
  "deleteSearchRecords",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `${DELETESEARCHRECORD_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getBlockHistory = createAsyncThunk(
  "getBlockHistory",
  async (params, { rejectWithValue }) => {
    const { page, page_size, type_of_history, date } = params;
    try {
      const response = await Axios.get(
        `${GETBLOCKHISTORY_API}?page=${page}&page_size=${page_size}&type_of_history=${type_of_history}&date=${date}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
