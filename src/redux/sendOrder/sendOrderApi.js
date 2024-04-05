/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { GETSENDORDER_API, POSTSENDORDER_API } from "../../constant/apis";
import Axios from "../../Config/axios";

export const getSendOrder = createAsyncThunk(
  "getSendOrder",
  async (params, { rejectWithValue }) => {
    const { profession, business } = params;
    try {
      const response = await Axios.get(
        `${GETSENDORDER_API}?profession=${profession}&business=${business}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const postSendOrder = createAsyncThunk(
  "postSendOrder",
  async (params, { rejectWithValue }) => {
    const {
      request_state,
      order_details,
      number_of_refill,
      confirmation_no,
      business_contact,
      email,
    } = params;

    try {
      const response = await Axios.post(
        `${POSTSENDORDER_API.replace(":confirmation_no", confirmation_no).replace(":state", request_state)}?business_contact=${business_contact}&email=${email}`,
        {
          order_details,
          number_of_refill,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
