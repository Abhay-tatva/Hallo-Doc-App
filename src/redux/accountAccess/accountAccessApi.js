/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  DELETEACCOUNTACCESS_API,
  GETACCOUNTACCESSEDIT_API,
  GETACCOUNTACCESS_API,
} from "../../constant/apis";

export const getAccountAccess = createAsyncThunk(
  "getAccountAccess",
  async (params, { rejectWithValue }) => {
    const { page, page_size } = params;
    try {
      const response = await Axios.get(
        `${GETACCOUNTACCESS_API}?page=${page}&page_size=${page_size}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const accountAccessEdit = createAsyncThunk(
  "accountAccessEdit",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETACCOUNTACCESSEDIT_API.replace(":role_id", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const accountAccessDelete = createAsyncThunk(
  "accountAccessDelete",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `${DELETEACCOUNTACCESS_API.replace(":role_id", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
