import { createSlice } from "@reduxjs/toolkit";
import {
  getPhysician,
  getRegions,
} from "../regionPhysician/regionPhysicianApi";

const regionPhysicianSlice = createSlice({
  name: "regionPhysician",
  initialState: {
    regions: [],
    physicians: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getRegions.fulfilled, (state, action) => {
      if (action.payload) {
        state.regions = action.payload.regions;
      }
    });
    builder.addCase(getPhysician.fulfilled, (state, action) => {
      if (action.payload) {
        state.physicians = action.payload.data;
      }
    });
  },
});

export default regionPhysicianSlice.reducer;
