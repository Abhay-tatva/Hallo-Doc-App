/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import {
  GETMYSCHEDULEVIEWSHIFT_API,
  GETMYSHIFT_API,
  POSTMYSCHEDULECREATESHIFT_API,
  PUTMYSCHEDULEEDIT_API,
} from "../../../constant/apis";

export const getMySchedule = createAsyncThunk(
  "getMySchedule",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${GETMYSHIFT_API}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const postMyScheduleCreateShift = createAsyncThunk(
  "postMyScheduleCreateShift",
  async (params, { rejectWithValue }) => {
    const { region, shift_date, start, end, repeat_days, repeat_end } = params;
    try {
      const response = await Axios.post(`${POSTMYSCHEDULECREATESHIFT_API}`, {
        region,
        shift_date,
        start,
        end,
        repeat_days,
        repeat_end,
      });
      return response?.data;
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response);
    }
  },
);

export const getMyScheduleViewShift = createAsyncThunk(
  "getMyScheduleViewShift",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETMYSCHEDULEVIEWSHIFT_API}?shift_id=${params}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putMyScheduleEdit = createAsyncThunk(
  "putMyScheduleEdit",
  async (params, { rejectWithValue }) => {
    const { shift_id, region, shift_date, start, end } = params;
    try {
      const response = await Axios.put(`${PUTMYSCHEDULEEDIT_API}`, {
        shift_id,
        region,
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
