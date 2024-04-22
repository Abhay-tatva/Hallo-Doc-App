/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import {
  getMySchedule,
  getMyScheduleViewShift,
} from "../../Provider Site/mySchedule/myScheduleApi";

const mySchedule = createSlice({
  name: "mySchedule",
  initialState: {
    myShift: [],
    myScheduleViewShiftData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getMySchedule.fulfilled, (state, action) => {
      if (action.payload) {
        state.myShift = action.payload.data;
      }
    });
    builder.addCase(getMyScheduleViewShift.fulfilled, (state, action) => {
      if (action.payload) {
        state.myScheduleViewShiftData = action.payload.data[0];
      }
    });
  },
});

export default mySchedule.reducer;
