/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../Config/axios";
import {
  DELETESEARCHRECORD_API,
  GETBLOCKHISTORY_API,
  GETLOGS,
  GETPATIENRECORDS_API,
  GETPATIENTHISTORY_API,
  GETSEARCHRECORD_API,
  PUTUNBLOCKHISTORY_API,
} from "../../constant/apis";

export const getPatientHistory = createAsyncThunk(
  "getPatientHistory",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.firstname) newParams.firstname = params.firstname;
    if (params.lastname) newParams.lastname = params.lastname;
    if (params.phone_no) newParams.phone_no = params.phone_no;
    if (params.email) newParams.email = params.email;
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;
    try {
      const response = await Axios.get(`${GETPATIENTHISTORY_API}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const getPatientRecords = createAsyncThunk(
  "getPatientRecords",
  async (params, { rejectWithValue }) => {
    const { page, page_size } = params;
    try {
      const response = await Axios.get(
        `${GETPATIENRECORDS_API}?page=${page}&page_size=${page_size}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const getSearchRecords = createAsyncThunk(
  "getSearchRecords",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.request_status) newParams.request_status = params.request_status;
    if (params.patient_name) newParams.patient_name = params.patient_name;
    if (params.request_type) newParams.request_type = params.request_type;
    if (params.from_date_of_service)
      newParams.from_date_of_service = params.from_date_of_service;
    if (params.provider_name) newParams.provider_name = params.provider_name;
    if (params.phone_no) newParams.phone_no = params.phone_no;
    if (params.email) newParams.email = params.email;
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;

    try {
      const response = await Axios.get(`${GETSEARCHRECORD_API}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const deleteSearchRecords = createAsyncThunk(
  "deleteSearchRecords",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `${DELETESEARCHRECORD_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getBlockHistory = createAsyncThunk(
  "getBlockHistory",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.name) newParams.name = params.name;
    if (params.type_of_history)
      newParams.type_of_history = params.type_of_history;
    if (params.phone_no) newParams.phone_no = params.phone_no;
    if (params.email) newParams.email = params.email;
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;
    try {
      const response = await Axios.get(`${GETBLOCKHISTORY_API}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const putUnblockHistory = createAsyncThunk(
  "putUnblockHistory",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${PUTUNBLOCKHISTORY_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getLogs = createAsyncThunk(
  "getLogs",
  async (params, { rejectWithValue }) => {
    const { page, page_size, type_of_log } = params;
    try {
      const response = await Axios.get(
        `${GETLOGS}?page=${page}&page_size=${page_size}&type_of_log=${type_of_log}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
