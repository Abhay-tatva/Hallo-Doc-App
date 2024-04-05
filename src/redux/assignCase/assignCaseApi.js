/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { ASSIGNMODAL_API } from "../../constant/apis";

export const assignCase = createAsyncThunk(
  "assignCase",
  async (params, { rejectWithValue }) => {
    const { firstname, lastname, assign_req_description, confirmationNo } =
      params;

    try {
      const response = await Axios.put(
        `${ASSIGNMODAL_API.replace(":confirmation_no", confirmationNo)}`,
        {
          firstname,
          lastname,
          assign_req_description,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
