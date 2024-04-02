/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  CREATEREQUESTVERIFY_API,
  CREATEREQUEST_API,
} from "../../constant/apis";

export const createRequest = createAsyncThunk(
  "createRequest",
  async (params, { rejectWithValue }) => {
    const {
      firstname,
      lastname,
      phone_number,
      email,
      DOB,
      street,
      city,
      state,
      zip,
      room,
      admin_notes,
    } = params;
    try {
      const response = await Axios.post(CREATEREQUEST_API, {
        firstname,
        lastname,
        phone_number,
        email,
        DOB,
        street,
        city,
        state,
        zip,
        room,
        admin_notes,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const createRequestVerify = createAsyncThunk(
  "createRequestVerify",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(CREATEREQUESTVERIFY_API, {
        state: params,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
