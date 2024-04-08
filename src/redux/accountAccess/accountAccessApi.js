/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  DELETEACCOUNTACCESS_API,
  GETACCOUNTACCESSEDIT_API,
  GETACCOUNTACCESS_API,
  PUTACCOUNTACCESS_API,
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

export const accountAccessPut = createAsyncThunk(
  "accountAccessPut",
  async (params, { rejectWithValue }) => {
    const { role_name, account_type, access_ids } = params;
    try {
      const response = await Axios.put(
        `${PUTACCOUNTACCESS_API.replace(":role_id", params)}`,
        {
          role_name,
          account_type,
          access_ids,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
