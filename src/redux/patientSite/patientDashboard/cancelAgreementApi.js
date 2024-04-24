/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import { CANCELAGREEMENT } from "../../../constant/apis";

export const cancelAgreement = createAsyncThunk(
  "cancelAgreement",
  async (params, { rejectWithValue }) => {
    const { cancel_confirmation, confirmation_no } = params;
    console.log("params", params);
    try {
      const response = await Axios.put(
        `${CANCELAGREEMENT.replace(":confirmation_no", confirmation_no)}`,
        {
          cancel_confirmation,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
