import { createSlice } from "@reduxjs/toolkit";
import { getCloseCase } from "../closeCase/closeCaseApi";

const closeCaseSlice = createSlice({
  name: "closeCaseSlice",
  initialState: { documents: [] },
  extraReducers: (builder) => {
    builder.addCase(getCloseCase.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("action.payload", action.payload);
        state.documents = action.payload.data;
      }
    });
  },
});

export default closeCaseSlice.reducer;
