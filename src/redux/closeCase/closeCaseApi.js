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
    try {
      const response = await Axios.put(
        `${PUTCLOSECASE_API.replace(":confirmation_no", params)}`,
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
    const { confirmation_no } = params;
    console.log("par", confirmation_no);
    try {
      const response = await Axios.put(
        `${POSTCLOSECASE_API.replace(":confirmation_no", confirmation_no)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
