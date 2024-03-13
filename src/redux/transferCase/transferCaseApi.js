import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { TRANSFERMODEL_API } from "../../constant/apis";

export const transferCase = createAsyncThunk(
  "transferCase",
  async (params, { rejectWithValue }) => {
    const { firstname, lastname, description, confirmationnumber } = params;
    try {
      const response = await Axios.post(
        `${TRANSFERMODEL_API.replace(":confirmation_no", confirmationnumber)}`,
        {
          withAuthToken: true,
          firstname,
          lastname,
          description,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
