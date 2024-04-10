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
        state.patientHistoryData = action.payload.data;
      }
    });
    builder.addCase(getPatientRecords.fulfilled, (state, action) => {
      if (action.payload) {
        state.patientRecordsData = action.payload.data;
      }
    });
    builder.addCase(getSearchRecords.fulfilled, (state, action) => {
      if (action.payload) {
        state.searchRecord = action.payload.data;
      }
    });
    builder.addCase(getBlockHistory.fulfilled, (state, action) => {
      if (action.payload) {
        state.blockHistory = action.payload.data;
      }
    });
    builder.addCase(getLogs.fulfilled, (state, action) => {
      if (action.payload) {
        state.logs = action.payload.data;
      }
    });
  },
});

export default records.reducer;
