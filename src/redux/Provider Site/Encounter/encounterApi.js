/* eslint-disable camelcase */

import Axios from "../../../Config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PUTHOUSECALL, PUTTYPEOFCARE_API } from "../../../constant/apis";

export const putTypeOfCare = createAsyncThunk(
  "putTypeOfCare",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${PUTTYPEOFCARE_API.replace(":confirmation_no", params.confirmation_no)}?type_of_care=${params.type_of_care}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const putHouseCall = createAsyncThunk(
  "putHouseCall",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${PUTHOUSECALL.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
