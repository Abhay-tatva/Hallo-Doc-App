/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { getEncounterForm } from "../../Provider Site/Encounter/encounterApi";

const encounterForm = createSlice({
  name: "encounterForm",
  initialState: {
    encounterData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getEncounterForm.fulfilled, (state, action) => {
      if (action.payload) {
        state.encounterData = action.payload.data[0];
      }
    });
  },
});

export default encounterForm.reducer;
