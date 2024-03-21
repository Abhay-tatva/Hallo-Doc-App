import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { NEWSTATE_API } from "../../constant/apis";

export const newState = createAsyncThunk(
  "newState",
  async (params, { rejectWithValue }) => {
    try {
      let url = `${NEWSTATE_API}?state=${params.state}`;
      if (params?.search) url += `&search=${params.search}`;
      if (params?.region !== "all") url += `&region=${params.region}`;
      const response = await Axios.get(url, {
        withAuthToken: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
