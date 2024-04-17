/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import {
  DELETEALL_API,
  SENDMAIL_API,
  SINGLEDELETE_API,
} from "../../constant/apis";

export const singleDelete = createAsyncThunk(
  "singleDelete",
  async (params, { rejectWithValue }) => {
    const { confirmation_no, document_id } = params;
    try {
      const response = await Axios.delete(
        `${SINGLEDELETE_API.replace(":confirmation_no", confirmation_no).replace(":document_id", document_id)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const deleteAll = createAsyncThunk(
  "deleteAll",
  async (params, { rejectWithValue }) => {
    console.log("parmaaaaaa", params);
    const { confirmationNumber, documentIds } = params;
    try {
      const response = await Axios.delete(
        `${DELETEALL_API.replace(":confirmation_no", confirmationNumber)}`,
        { data: { document_ids: documentIds } },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const sendMail = createAsyncThunk(
  "sendMail",
  async (params, { rejectWithValue }) => {
    const { confirmationNumber, documentIds } = params;
    try {
      const response = await Axios.post(
        `${SENDMAIL_API.replace(":confirmation_no", confirmationNumber)}`,
        { document_ids: documentIds },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
