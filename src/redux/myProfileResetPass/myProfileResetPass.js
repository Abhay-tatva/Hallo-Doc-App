/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { MYPROFILERESETPASS_API } from "../../constant/apis";

export const resetPass = createAsyncThunk(
  "resetPass",
  async (params, { rejectWithValue }) => {
    console.log(params);
    const { user_id, password } = params;

    try {
      const response = await Axios.put(MYPROFILERESETPASS_API, {
        user_id,
        password,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
