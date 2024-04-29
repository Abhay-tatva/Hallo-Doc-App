import { createAsyncThunk } from "@reduxjs/toolkit";
import { PUTMYPROFILERESSPASS } from "../../../constant/apis";
import Axios from "../../../Config/axios";

export const putMyProfileRessPass = createAsyncThunk(
  "putMyProfileRessPass",
  async (params, { rejectWithValue }) => {
    const { password } = params;

    try {
      const response = await Axios.put(PUTMYPROFILERESSPASS, {
        password,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
