import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { VIEWUPLOAD_API } from "../../constant/apis";

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
