/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { GETMEDICALHISTORY } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const getMedicalHistory = createAsyncThunk(
  "getMedicalHistory",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;
    try {
      const response = await Axios.get(`${GETMEDICALHISTORY}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
