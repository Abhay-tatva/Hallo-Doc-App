/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import {
  getProviderOnCall,
  getProviderShift,
  getRequestShift,
  getViewShift,
} from "../Scheduling/schedulingApi";

const scheduling = createSlice({
  name: "scheduling",
  initialState: {
    providerOnCalls: [],
    providerOffDuties: [],
    requestShiftData: [],
    providerShift: [],
    viewShiftData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getProviderOnCall.fulfilled, (state, action) => {
      if (action.payload) {
        state.providerOnCalls = action.payload.provider_on_call;
        state.providerOffDuties = action.payload.provider_off_duty;
      }
    });
    builder.addCase(getRequestShift.fulfilled, (state, action) => {
      if (action.payload) {
        state.requestShiftData = action.payload.data;
      }
    });
    builder.addCase(getProviderShift.fulfilled, (state, action) => {
      if (action.payload) {
        state.providerShift = action.payload.data;
      }
    });
    builder.addCase(getViewShift.fulfilled, (state, action) => {
      if (action.payload) {
        state.viewShiftData = action.payload.data[0];
      }
    });
  },
});

export default scheduling.reducer;
