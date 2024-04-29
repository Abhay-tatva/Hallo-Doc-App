import { GETUSERACCESS_API } from "../../constant/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";

/* eslint-disable camelcase */
export const getUserAccess = createAsyncThunk(
  "getUserAccess",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;
    if (params.region !== "all") newParams.region = params.region;

    try {
      const response = await Axios.get(`${GETUSERACCESS_API}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
