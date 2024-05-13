/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { DOWNLOADALL_API, SINGLEDOWNLOAD_API } from "../../constant/apis";

export const singleDownload = createAsyncThunk(
  "singleDownload",
  async (params, { rejectWithValue }) => {
    const { confirmation_no, document_id } = params;
    try {
      const response = await Axios.get(
        `${SINGLEDOWNLOAD_API.replace(":confirmation_no", confirmation_no).replace(":document_id", document_id)}`,
        {
          responseType: "blob",
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const downloadAll = createAsyncThunk(
  "downloadAll",
  async (params, { rejectWithValue }) => {
    const { confirmationNumber, documentIds } = params;

    try {
      const response = await Axios.get(
        `${DOWNLOADALL_API.replace(":confirmation_no", confirmationNumber)}?document_id=${documentIds}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
