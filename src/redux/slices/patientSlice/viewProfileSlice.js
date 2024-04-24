/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { viewProfile } from "../../patientSite/patientDashboard/profileApi";

const viewProfileSlice = createSlice({
  name: "viewProfileSlice",
  initialState: {
    profileData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(viewProfile.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log("accces account", action.payload);
        state.profileData = action.payload.data[0];
      }
    });
  },
});

export default viewProfileSlice.reducer;
