/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { SENDAGREEMENT_API } from "../../constant/apis";

export const sendAgreement = createAsyncThunk(
  "sendAgreement",
  async (params, { rejectWithValue }) => {
    const { mobile_no, email, confirmationnumber } = params;
    try {
      const response = await Axios.post(
        `${SENDAGREEMENT_API.replace(":confirmation_no", confirmationnumber)}`,
        {
          mobile_no,
          email,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
