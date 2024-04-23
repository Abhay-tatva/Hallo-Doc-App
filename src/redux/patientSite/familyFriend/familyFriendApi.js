/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import { CREATEFAMILYFRIEND } from "../../../constant/apis";

export const postFamilyFriend = createAsyncThunk(
  "postFamilyFriend",
  async (params, { rejectWithValue }) => {
    const {
      your_first_name,
      your_last_name,
      your_mobile_no,
      your_email,
      your_relation_with_patient,
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
      const response = await Axios.post(`${CREATEFAMILYFRIEND}`, {
        your_first_name,
        your_last_name,
        your_mobile_no,
        your_email,
        your_relation_with_patient,
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
