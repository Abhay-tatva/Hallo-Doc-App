/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DELETEPARTNER_API,
  GETBUSINESSVIEW_API,
  GETPARTNERSLIST_API,
  POSTADDBUSSINESS_API,
  PUTBUSINESSUPDATE_API,
} from "../../constant/apis";
import Axios from "../../Config/axios";

export const getPartners = createAsyncThunk(
  "getPartners",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;
    if (params.region !== "all") newParams.region = params.region;
    if (params.vendor) newParams.vendor = params.vendor;
    try {
      const response = await Axios.get(`${GETPARTNERSLIST_API}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const postBusiness = createAsyncThunk(
  "postBusiness",
  async (params, { rejectWithValue }) => {
    const { data } = params;

    try {
      const response = await Axios.post(`${POSTADDBUSSINESS_API}`, {
        business_name: data.businessName,
        profession: data.profession,
        fax_number: data.faxNumber,
        mobile_no: data.phoneNumber,
        email: data.email,
        business_contact: data.bussinessContact,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zipPostal,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const deletePartners = createAsyncThunk(
  "deletePartners",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `${DELETEPARTNER_API.replace(":business_id", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getBusinessView = createAsyncThunk(
  "getBusinessView",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETBUSINESSVIEW_API.replace(":business_id", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const putBusinessUpdate = createAsyncThunk(
  "putBusinessUpdate",
  async (params, { rejectWithValue }) => {
    const { data, business_id } = params;
    try {
      const response = await Axios.put(
        `${PUTBUSINESSUPDATE_API.replace(":business_id", business_id)}`,
        {
          business_name: data.businessName,
          profession: data.profession,
          fax_number: data.faxNumber,
          mobile_no: data.phoneNumber,
          email: data.email,
          business_contact: data.bussinessContact,
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zipPostal,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
