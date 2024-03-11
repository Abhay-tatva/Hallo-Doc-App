import { createSlice } from "@reduxjs/toolkit";
import { viewCase } from "../viewCase/viewCaseApi";

const viewCaseSlice = createSlice({
  name: "viewCase",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(viewCase.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default viewCaseSlice.reducer;
