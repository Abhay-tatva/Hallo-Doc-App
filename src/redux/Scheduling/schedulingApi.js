/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  DELETESELECTEDSHIFT_API,
  GETPROVIDERONCALL_API,
  GETPROVIDERSHIFTA_API,
  GETREQUESTSHIFT_API,
  GETVIEWSHIFT,
  POSTCREATESHIFT_API,
  PUTAPPROVEDSHIFT_API,
  PUTEDITSHIFT,
  PUTRETURNSHIFT,
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
      const response = await Axios.post(`${POSTCREATESHIFT_API}`, {
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
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;
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
    const { shiftIds } = params;
    try {
      const response = await Axios.put(`${PUTAPPROVEDSHIFT_API}`, {
        shift_ids: shiftIds,
      });

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
      const { shiftIds } = params;

      const response = await Axios.delete(`${DELETESELECTEDSHIFT_API}`, {
        data: {
          shift_ids: shiftIds,
        },
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getProviderShift = createAsyncThunk(
  "getProviderShift",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.region !== "all") newParams.region = params.region;
    try {
      const response = await Axios.get(`${GETPROVIDERSHIFTA_API}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getViewShift = createAsyncThunk(
  "getViewShift",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${GETVIEWSHIFT}?shift_id=${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putReturnShift = createAsyncThunk(
  "putReturnShift",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${PUTRETURNSHIFT.replace(":shift_id", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const putEditShift = createAsyncThunk(
  "putEditShift",
  async (params, { rejectWithValue }) => {
    const { shift_id, region, physician, shift_date, start, end } = params;
    try {
      const response = await Axios.put(`${PUTEDITSHIFT}`, {
        shift_id,
        region,
        physician,
        shift_date,
        end,
        start,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
