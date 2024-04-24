import { createSlice } from "@reduxjs/toolkit";
import { requestViewCase } from "../../patientSite/patientDashboard/requestViewDocument";

const patientViewUploadSlice = createSlice({
  name: "patientViewUploadSlice",
  initialState: {
    patientViewData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(requestViewCase.fulfilled, (state, action) => {
      if (action.payload) {
        state.patientViewData = action.payload.data[0];
      }
    });
  },
});

export default patientViewUploadSlice.reducer;
