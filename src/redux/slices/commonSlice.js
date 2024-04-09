/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { commonApi } from "../commonApi/commonApi";

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    request_id: "",
    request_state: "",
    confirmation_no: "",
  },
  extraReducers: (builder) => {
    builder.addCase(commonApi.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      if (action.payload) {
        state.confirmation_no = action.payload.data[0].confirmation_no;
        state.request_id = action.payload.data[0].request_id;
        state.request_state = action.payload.data[0].request_state;
      }
    });
  },
});

export default commonSlice.reducer;
