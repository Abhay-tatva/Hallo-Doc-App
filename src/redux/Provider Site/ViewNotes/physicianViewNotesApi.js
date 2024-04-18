/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PHYSICIANVIEWNOTES_API,
  PUTPHYSICIANVIEWNOTES_API,
} from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const physicianViewNotes = createAsyncThunk(
  "physicianViewNotes",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${PHYSICIANVIEWNOTES_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const putphysicianViewNotes = createAsyncThunk(
  "putphysicianViewNotes",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${PUTPHYSICIANVIEWNOTES_API.replace(":confirmation_no", params.confirmnumber)}`,
        {
          new_note: params.value,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
