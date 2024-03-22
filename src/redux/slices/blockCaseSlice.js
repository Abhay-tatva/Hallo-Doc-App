import { createSlice } from "@reduxjs/toolkit";
import { blockcaseGet } from "../blockCaseApi.js/blockCaseApi";

const blockCaseSlice = createSlice({
  name: "blockCase",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(blockcaseGet.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default blockCaseSlice.reducer;
