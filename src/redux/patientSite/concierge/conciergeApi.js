/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import { CREATECONCIERGE } from "../../../constant/apis";

export const postConcierge = createAsyncThunk(
  "postConcierge",
  async (params, { rejectWithValue }) => {
    const {
      your_first_name,
      your_last_name,
      your_mobile_no,
      your_email,
      your_house_name,
      symptoms,
      firstname,
      lastname,
      date_of_birth,
      email,
      mobile_no,
      your_street,
      your_city,
      your_state,
      your_zip,
      room,
    } = params;
    try {
      const response = await Axios.post(`${CREATECONCIERGE}`, {
        your_first_name,
        your_last_name,
        your_mobile_no,
        your_email,
        your_house_name,
        symptoms,
        firstname,
        lastname,
        date_of_birth,
        email,
        mobile_no,
        your_street,
        your_city,
        your_state,
        your_zip,
        room,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
