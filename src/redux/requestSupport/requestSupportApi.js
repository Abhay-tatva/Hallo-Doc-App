/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { REQUESTSUPPORT_API } from "../../constant/apis";

export const requestSupport = createAsyncThunk(
  "requestSupport",
  async (params, { rejectWithValue }) => {
    const { support_message } = params;

    try {
      const response = await Axios.put(REQUESTSUPPORT_API, {
        support_message,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
