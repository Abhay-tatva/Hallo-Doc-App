/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import { PUTVIEWPROFILE, VIEWPROFILE } from "../../../constant/apis";

export const viewProfile = createAsyncThunk(
  "viewProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEWPROFILE}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const putViewProfile = createAsyncThunk(
  "putViewProfile",
  async (params, { rejectWithValue }) => {
    const {
      firstname,
      lastname,
      date_of_birth,
      mobile_no,
      type,
      email,
      street,
      city,
      state,
      zip,
    } = params;
    try {
      const response = await Axios.put(`${PUTVIEWPROFILE}`, {
        firstname,
        lastname,
        date_of_birth,
        mobile_no,
        type,
        email,
        street,
        city,
        state,
        zip,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
