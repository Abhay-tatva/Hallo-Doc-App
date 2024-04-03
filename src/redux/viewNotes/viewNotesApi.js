/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { VIEWNOTES_API } from "../../constant/apis";

export const viewNotes = createAsyncThunk(
  "viewNotes",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${VIEWNOTES_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const viewNotesUpdate = createAsyncThunk(
  "viewNotesUpdate",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${VIEWNOTES_API.replace(":confirmation_no", params.confirmnumber)}`,
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
