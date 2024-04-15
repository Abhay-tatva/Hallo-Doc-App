/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  DELETEACCOUNTACCESS_API,
  GETACCESSLIST_API,
  GETACCOUNTACCESSEDIT_API,
  GETACCOUNTACCESS_API,
  POSTACCOUNTACCESS_API,
  PUTACCOUNTACCESS_API,
} from "../../constant/apis";

export const getAccountAccess = createAsyncThunk(
  "getAccountAccess",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;
    try {
      const response = await Axios.get(`${GETACCOUNTACCESS_API}`, {
        params: newParams,
      });
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
    const { data, role_id } = params;
    try {
      const response = await Axios.put(
        `${PUTACCOUNTACCESS_API.replace(":role_id", role_id)}`,
        {
          role_name: data.role_name,
          account_type: data.account_type,
          access_ids: data.access_ids,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const accountAccessPost = createAsyncThunk(
  "accountAccessPost",
  async (params, { rejectWithValue }) => {
    const { role_name, account_type, access_ids } = params;
    try {
      const response = await Axios.post(`${POSTACCOUNTACCESS_API}`, {
        role_name,
        account_type,
        access_ids,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getAccountAccessList = createAsyncThunk(
  "getAccountAccessList",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETACCESSLIST_API}?account_type=${params}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
