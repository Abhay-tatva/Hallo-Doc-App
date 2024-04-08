import { GETUSERACCESS_API } from "../../constant/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";

/* eslint-disable camelcase */
export const getUserAccess = createAsyncThunk(
  "getUserAccess",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${GETUSERACCESS_API}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
