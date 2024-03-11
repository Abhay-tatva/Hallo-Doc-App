import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { NEWSTATE_API } from "../../constant/apis";

export const newState = createAsyncThunk(
  "newState",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${NEWSTATE_API}?state=${params}`, {
        withAuthToken: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
