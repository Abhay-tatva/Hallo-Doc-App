/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  DELETEPROVIDER_API,
  GETPROVIDERINFORMATION_API,
  GETPROVIDERPHYSICIANDATA_API,
  POSTCONTACTPROVIDER_API,
  POSTCREATEPROVIDER_API,
  PROVIDEREDIT_API,
  PUTONBOARDING_API,
  PUTPHOTOUPDATE_API,
  PUTPROVIDERPROFILE_API,
  PUTRESETPROVIDERPASSWORD_API,
  PUTSTOPNOTIFICATION_API,
} from "../../constant/apis";

export const getProvider = createAsyncThunk(
  "getProvider",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.page) newParams.page = params.page;
    if (params.page_size) newParams.page_size = params.page_size;
    if (params.region !== "all") newParams.region = params.region;
    try {
      const response = await Axios.get(`${GETPROVIDERINFORMATION_API}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const postContactProvider = createAsyncThunk(
  "postContactProvider",
  async (params, { rejectWithValue }) => {
    const { message, user_id, communicationMethod } = params;
    try {
      let url = POSTCONTACTPROVIDER_API.replace(":user_id", user_id);
      if (communicationMethod === "email") url += `?email=yes`;
      if (communicationMethod === "sms") url += `?mobile_no=yes`;
      if (communicationMethod === "both") url += `?email=yes&mobile_no=yes`;

      const response = await Axios.post(url, {
        message,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getProviderPhysician = createAsyncThunk(
  "getProviderPhysician",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETPROVIDERPHYSICIANDATA_API.replace(":user_id", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putProviderResetPassword = createAsyncThunk(
  "putProviderResetPassword",
  async (params, { rejectWithValue }) => {
    const { user_id, password } = params;

    try {
      const response = await Axios.put(PUTRESETPROVIDERPASSWORD_API, {
        user_id,
        password,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putProviderInfo = createAsyncThunk(
  "putProviderInfo",
  async (params, { rejectWithValue }) => {
    const { user_id, data } = params;

    try {
      const response = await Axios.put(`${PROVIDEREDIT_API}`, {
        user_id,
        firstname: data?.firstName,
        lastname: data?.lastName,
        email: data?.email,
        mobile_no: data?.phoneNumber?.toString(),
        medical_licence: data?.medicalLicence,
        NPI_no: data?.npiNumber?.toString(),
        synchronization_email: data?.synEmail,
        region_ids: data?.regions,
        address_1: data?.address_1,
        address_2: data?.address_2,
        city: data?.city,
        state: data?.state,
        zip: data?.zip,
        billing_mobile_no: data?.billNumber,
        business_name: data?.business_name,
        business_website: data?.business_website,
        admin_notes: data?.admin_notes,
      });
      return response?.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error?.response);
    }
  },
);

export const deleteProvider = createAsyncThunk(
  "deleteProvider",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `${DELETEPROVIDER_API.replace(":user_id", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const postCreateProvider = createAsyncThunk(
  "postCreateProvider",
  async (params, { rejectWithValue }) => {
    const { data } = params;
    try {
      const response = await Axios.post(`${POSTCREATEPROVIDER_API}`, {
        username: data?.userName,
        password: data?.password,
        role: data?.role,
        firstname: data?.firstName,
        lastname: data?.lastName,
        email: data?.email,
        mobile_no: data?.administratorPhone.toString(),
        medical_licence: data?.medicalLicense,
        NPI_no: data?.npiNumber,
        district_of_columbia: data?.district_of_columbia,
        new_york: data?.new_york,
        virginia: data?.virginia,
        maryland: data?.maryland,
        address_1: data?.address1,
        address_2: data?.address2,
        city: data?.city,
        state: data?.state,
        zip: data?.zip,
        billing_mobile_no: data?.mailingPhone,
        business_name: data?.businessName,
        business_website: data?.businessWebsite,
        admin_notes: data?.adminNotes,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putProviderProfile = createAsyncThunk(
  "putProviderProfile",
  async (params, { rejectWithValue }) => {
    const { user_id, data } = params;

    try {
      const response = await Axios.put(PUTPROVIDERPROFILE_API, {
        user_id,
        business_name: data?.businessName,
        business_website: data?.businessWebsite,
        admin_notes: data?.adminNotes,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putPhotoUpdate = createAsyncThunk(
  "putPhotoUpdate",
  async (params, { rejectWithValue }) => {
    const { userId, formData } = params;
    try {
      const response = await Axios.put(
        `${PUTPHOTOUPDATE_API.replace(":user_id", userId)}`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putOnBoarding = createAsyncThunk(
  "putOnBoarding",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(PUTONBOARDING_API, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const putStopNotification = createAsyncThunk(
  "putStopNotification",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(PUTSTOPNOTIFICATION_API, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
