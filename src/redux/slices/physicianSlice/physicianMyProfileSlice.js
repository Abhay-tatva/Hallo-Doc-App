/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { getPhysicianMyProfile } from "../../Provider Site/physicianMyProfile/physicianMyProfileApi";

const myProfilePhysician = createSlice({
  name: "myProfilePhysician",
  initialState: {
    myProfilePhysicianData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getPhysicianMyProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.myProfilePhysicianData = action.payload.data[0];
      }
    });
  },
});

export default myProfilePhysician.reducer;
