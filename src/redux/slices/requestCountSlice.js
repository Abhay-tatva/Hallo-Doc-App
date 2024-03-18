import { createSlice } from "@reduxjs/toolkit";
import { requestCount } from "../requestCount/requestCountApi";

export const requestCountSlice = createSlice({
  name: "requestCount",
  initialState: { caseCount: [] },
  extraReducers: (builder) => {
    builder.addCase(requestCount.fulfilled, (state, action) => {
      if (action.payload) {
        state.caseCount = action.payload.data;
      }
    });
  },
});

export default requestCountSlice.reducer;
