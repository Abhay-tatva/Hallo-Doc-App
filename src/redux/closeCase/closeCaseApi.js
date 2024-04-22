/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  GETCLOSECASE_API,
  POSTCLOSECASE_API,
  PUTCLOSECASE_API,
} from "../../constant/apis";

export const getCloseCase = createAsyncThunk(
  "getCloseCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETCLOSECASE_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putCloseCase = createAsyncThunk(
  "putCloseCase",
  async (params, { rejectWithValue }) => {
    const { confirmationNo, formData } = params;
    try {
      const response = await Axios.put(
        `${PUTCLOSECASE_API.replace(":confirmation_no", confirmationNo)}`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const postCloseCase = createAsyncThunk(
  "postCloseCase",
  async (params, { rejectWithValue }) => {
    const { firstname, lastname, dob, mobile_no, email, confirmation_no } =
      params;

    try {
      const response = await Axios.post(
        `${POSTCLOSECASE_API.replace(":confirmation_no", confirmation_no)}`,
        {
          firstname,
          lastname,
          dob,
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
