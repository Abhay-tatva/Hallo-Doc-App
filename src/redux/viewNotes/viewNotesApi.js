import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { VIEWNOTES_API } from "../../constant/apis";

export const viewNotes = createAsyncThunk(
  "viewNotes",
  async (params, { rejectWithVAlue }) => {
    try {
      const response = await Axios.get(
        `${VIEWNOTES_API.replace(":confirmation_no", params)}`,
        {
          withAuthToken: true,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithVAlue(error?.response);
    }
  },
);
export const viewNotesUpdate = createAsyncThunk(
  "viewNotesUpdate",
  async (params, { rejectWithVAlue }) => {
    try {
      const response = await Axios.put(
        `${VIEWNOTES_API.replace(":confirmation_no", params.confirmnumber)}`,
        {
          withAuthToken: true,
          new_note: params.value,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithVAlue(error?.response);
    }
  },
);
