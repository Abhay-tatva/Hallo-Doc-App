import { createSlice } from "@reduxjs/toolkit";
import { cancelCase } from "../cancelCase/cancelCaseApi";

const cancelCaseSlice = createSlice({
  name: "cancelCase",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(cancelCase.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default cancelCaseSlice.reducer;
