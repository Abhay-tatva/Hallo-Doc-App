/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { SENDLINK_API } from "../../constant/apis";

export const sendLink = createAsyncThunk(
  "sendLink",
  async (params, { rejectWithValue }) => {
    const { firstname, lastname, mobile_no, email } = params;

    try {
      const response = await Axios.post(SENDLINK_API, {
        firstname,
        lastname,
        mobile_no,
        email,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
