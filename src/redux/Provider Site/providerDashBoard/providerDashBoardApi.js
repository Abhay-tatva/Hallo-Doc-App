import { createAsyncThunk } from "@reduxjs/toolkit";
import { GETPROVIDERREQUESTBYSTATE_API } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const providerDashBoard = createAsyncThunk(
  "providerDashBoard",
  async (params, { rejectWithValue }) => {
    try {
      let url = `${GETPROVIDERREQUESTBYSTATE_API}?state=${params.state}`;
      if (params?.search) url += `&search=${params.search}`;
      if (params?.region !== "all") url += `&region=${params.region}`;
      if (params?.page_size) url += `&page_size=${params.page_size}`;
      if (params?.page) url += `&page=${params.page}`;
      const response = await Axios.get(url);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
