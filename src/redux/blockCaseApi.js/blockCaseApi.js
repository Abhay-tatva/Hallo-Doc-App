import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Config/axios";
import { GETBLOACKCASE_API, PUTBLOCKCASE_API } from "../../constant/apis";

export const blockcaseGet = createAsyncThunk(
  "blockcaseGet",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GETBLOACKCASE_API.replace(":confirmation_no", params)}`,
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

export const blockCasePut = createAsyncThunk(
  "blockCasePut",
  async (params, { rejectWithValue }) => {
    const { reason_for_block, confirmation_no } = params;
    console.log("params", params);

    try {
      const response = await Axios.put(
        `${PUTBLOCKCASE_API.replace(":confirmation_no", confirmation_no)}`,
        {
          // withAuthToken: true,
          reason_for_block,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
