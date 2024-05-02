/* eslint-disable camelcase */

import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { GETMYPROFILE_API, PUTMYPROFILE_API } from "../../constant/apis";

export const getMyProfile = createAsyncThunk(
  "getMyProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(GETMYPROFILE_API, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putMyProfile = createAsyncThunk(
  "putMyProfile",
  async (params, { rejectWithValue }) => {
    const { user_id, data } = params;
    try {
      const response = await Axios.put(`${PUTMYPROFILE_API}`, {
        user_id,
        firstname: data?.firstName,
        lastname: data?.lastName,
        email: data?.email,
        mobile_no: data?.mobileNo,
        region_ids: data?.regions,
        address_1: data?.address1,
        address_2: data?.address2,
        city: data?.city,
        state: data?.state,
        zip: data?.zip?.toString(),
        billing_mobile_no: data?.billNumber.toString(),
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
