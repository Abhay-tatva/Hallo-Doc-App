/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { getMySchedule } from "../../Provider Site/mySchedule/myScheduleApi";

const mySchedule = createSlice({
  name: "mySchedule",
  initialState: {
    myShift: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getMySchedule.fulfilled, (state, action) => {
      if (action.payload) {
        state.myShift = action.payload.data;
      }
    });
  },
});

export default mySchedule.reducer;
