/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import { PATIENTBUSINESS } from "../../../constant/apis";

export const postBusiness = createAsyncThunk(
  "postBusiness",
  async (params, { rejectWithValue }) => {
    const {
      your_first_name,
      your_last_name,
      your_mobile_no,
      your_email,
      your_property_name,
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
    } = params;
    try {
      const response = await Axios.post(`${PATIENTBUSINESS}`, {
        your_first_name,
        your_last_name,
        your_mobile_no,
        your_email,
        your_property_name,
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
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
