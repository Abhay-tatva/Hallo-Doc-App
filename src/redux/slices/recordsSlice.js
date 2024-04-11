/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import {
  getBlockHistory,
  getLogs,
  getPatientHistory,
  getPatientRecords,
  getSearchRecords,
} from "../records/recordsApi";

const records = createSlice({
  name: "records",
  initialState: {
    patientHistoryData: [],
    patientRecordsData: [],
    searchRecord: [],
    blockHistory: [],
    logs: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getPatientHistory.fulfilled, (state, action) => {
      if (action.payload) {
        state.patientHistoryData = action.payload;
      }
    });
    builder.addCase(getPatientRecords.fulfilled, (state, action) => {
      if (action.payload) {
        state.patientRecordsData = action.payload;
      }
    });
    builder.addCase(getSearchRecords.fulfilled, (state, action) => {
      if (action.payload) {
        state.searchRecord = action.payload;
      }
    });
    builder.addCase(getBlockHistory.fulfilled, (state, action) => {
      if (action.payload) {
        state.blockHistory = action.payload;
      }
    });
    builder.addCase(getLogs.fulfilled, (state, action) => {
      if (action.payload) {
        state.logs = action.payload;
      }
    });
  },
});

export default records.reducer;
