import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { VIEWUPDATE_API, VIEWUPLOAD_API } from "../../constant/apis";

export const viewUpload = createAsyncThunk(
  "viewUpload",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${VIEWUPLOAD_API.replace(":confirmation_no", params)}`,
        {
          withAuthToken: true,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const viewUpdate = createAsyncThunk(
  "viewUpdate",
  async (params, { rejectWithValue }) => {
    const { confirmation_no, file } = params;
    try {
      const response = await Axios.post(
        `${VIEWUPDATE_API.replace(":confirmaton_no", confirmation_no)}`,
        {
          withAuthToken: true,
          file,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
