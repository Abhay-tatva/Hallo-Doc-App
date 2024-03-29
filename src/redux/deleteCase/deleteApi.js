/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { DELETEALL_API, SINGLEDELETE_API } from "../../constant/apis";

export const singleDelete = createAsyncThunk(
  "singleDelete",
  async (params, { rejectWithValue }) => {
    const { confirmation_no, document_id } = params;
    try {
      const response = await Axios.get(
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
    try {
      const response = await Axios.delete(
        `${DELETEALL_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
