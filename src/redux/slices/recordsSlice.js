/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { getPatientHistory } from "../records/recordsApi";

const records = createSlice({
  name: "records",
  initialState: {
    patientHistoryData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getPatientHistory.fulfilled, (state, action) => {
      if (action.payload) {
        state.patientHistoryData = action.payload.data;
      }
    });
  },
});

export default records.reducer;
