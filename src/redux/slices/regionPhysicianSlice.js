import { createSlice } from "@reduxjs/toolkit";
import {
  getPhysician,
  getRegions,
  getShiftPhysician,
} from "../regionPhysician/regionPhysicianApi";

const regionPhysicianSlice = createSlice({
  name: "regionPhysician",
  initialState: {
    regions: [],
    physicians: [],
    shiftPhysician: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getRegions.fulfilled, (state, action) => {
      if (action.payload) {
        state.regions = action.payload.data;
      }
    });
    builder.addCase(getPhysician.fulfilled, (state, action) => {
      if (action.payload) {
        state.physicians = action.payload.data;
      }
    });
    builder.addCase(getShiftPhysician.fulfilled, (state, action) => {
      if (action.payload) {
        state.shiftPhysician = action.payload.data;
      }
    });
  },
});

export default regionPhysicianSlice.reducer;
