/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import { CREATEPATIENT, ISPATIENTREGISTERED } from "../../../constant/apis";

export const isPatientRegister = createAsyncThunk(
  "isPatientRegister",
  async (params, { rejectWithValue }) => {
    const { email } = params;
    console.log("object", params);
    try {
      const response = await Axios.post(`${ISPATIENTREGISTERED}`, {
        email,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const postCreatePatient = createAsyncThunk(
  "postCreatePatient",
  async (params, { rejectWithValue }) => {
    const {
      symptoms,
      firstname,
      lastname,
      date_of_birth,
      email,
      mobile_no,
      street,
      city,
      state,
      zip,
      room,
      file,
    } = params;
    try {
      const response = await Axios.post(`${CREATEPATIENT}`, {
        symptoms,
        firstname,
        lastname,
        date_of_birth,
        email,
        mobile_no,
        street,
        city,
        state,
        zip,
        room,
        file,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
