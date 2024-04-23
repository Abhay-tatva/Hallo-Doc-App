/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { getMedicalHistory } from "../../patientSite/patientDashboard/medicalHistoryApi";

const medicalHistory = createSlice({
  name: "medicalHistory",
  initialState: {
    medicalData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getMedicalHistory.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log("accces account", action.payload);
        state.medicalData = action.payload.data;
      }
    });
  },
});

export default medicalHistory.reducer;
