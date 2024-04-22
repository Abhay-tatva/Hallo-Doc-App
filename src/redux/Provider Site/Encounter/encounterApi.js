/* eslint-disable camelcase */

import Axios from "../../../Config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GETDOWNLOADENCOUNTERFORM_API,
  GETENCOUNTERFORM_API,
  PUTENCOUNTERFORM_API,
  PUTFINALIZE_API,
  PUTHOUSECALL,
  PUTTYPEOFCARE_API,
} from "../../../constant/apis";

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

export const putEncounterForm = createAsyncThunk(
  "putEncounterForm",
  async (params, { rejectWithValue }) => {
    const { confirmation_no, data } = params;
    try {
      const response = await Axios.put(
        `${PUTENCOUNTERFORM_API.replace(":confirmation_no", confirmation_no)}`,
        {
          ...data,
          temperature: +data.temperature,
          heart_rate: +data.heart_rate,
          respiratory_rate: +data.respiratory_rate,
          blood_pressure_1: +data.blood_pressure_1,
          blood_pressure_2: +data.blood_pressure_2,
          o2: +data.o2,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getEncounterForm = createAsyncThunk(
  "getEncounterForm",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETENCOUNTERFORM_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putFinalize = createAsyncThunk(
  "putFinalize",
  async (params, { rejectWithValue }) => {
    const { confirmation_no } = params;
    try {
      const response = await Axios.put(
        `${PUTFINALIZE_API.replace(":confirmation_no", confirmation_no)}`,
        {
          finalize_status: true,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getDownload = createAsyncThunk(
  "getDownload",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETDOWNLOADENCOUNTERFORM_API.replace(":confirmation_no", params)}`,
        {},
        { responseType: "blob" },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
