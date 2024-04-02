/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { GETACCOUNTACCESS_API } from "../../constant/apis";

export const getAccountAccess = createAsyncThunk(
  "getAccountAccess",
  async (params, { rejectWithValue }) => {
    const { page, page_size } = params;
    try {
      const response = await Axios.get(
        `${GETACCOUNTACCESS_API}?page=${page}&page_size=${page_size}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
