/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import {
  getProviderOnCall,
  getRequestShift,
} from "../Scheduling/schedulingApi";

const scheduling = createSlice({
  name: "scheduling",
  initialState: {
    providerOnCalls: [],
    providerOffDuties: [],
    requestShiftData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getProviderOnCall.fulfilled, (state, action) => {
      console.log(action.payload);
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
  },
});

export default scheduling.reducer;
