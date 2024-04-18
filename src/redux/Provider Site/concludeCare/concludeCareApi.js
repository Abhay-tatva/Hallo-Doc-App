import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../Config/axios";
import {
  GETCONCLUDECARE_API,
  POSTCONCLUDECAREUPLOAD_API,
} from "../../../constant/apis";

export const getConcludeCare = createAsyncThunk(
  "getConcludeCare",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETCONCLUDECARE_API.replace(":confirmation_no", params)}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
export const postConcludeCare = createAsyncThunk(
  "postConcludeCare",
  async (params, { rejectWithValue }) => {
    console.log("parmasss", params);
    const { confirmationNo, formData } = params;
    try {
      const response = await Axios.post(
        `${POSTCONCLUDECAREUPLOAD_API.replace(":confirmation_no", confirmationNo)}`,
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
