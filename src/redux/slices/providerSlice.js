/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { getProvider, getProviderPhysician } from "../provider/providerApi";

const providerMenu = createSlice({
  name: "providerMenu",
  initialState: {
    providerData: [],
    physicianData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getProvider.fulfilled, (state, action) => {
      if (action.payload) {
        state.providerData = action.payload.data;
      }
    });
    builder.addCase(getProviderPhysician.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      if (action.payload) {
        state.physicianData = action.payload.data[0];
      }
    });
  },
});

export default providerMenu.reducer;
