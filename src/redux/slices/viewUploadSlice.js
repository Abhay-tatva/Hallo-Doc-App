import { createSlice } from "@reduxjs/toolkit";
import { viewUpload } from "../viewUpload/viewUploadApi";
import { getConcludeCare } from "../Provider Site/concludeCare/concludeCareApi";

const viewUploadSlice = createSlice({
  name: "viewUpload",
  initialState: { uploadFile: [] },
  extraReducers: (builder) => {
    builder.addCase(viewUpload.fulfilled, (state, action) => {
      if (action.payload) {
        state.uploadFile = action.payload.data;
      }
    });
    builder.addCase(getConcludeCare.fulfilled, (state, action) => {
      if (action.payload) {
        state.uploadFile = action.payload.data;
      }
    });
  },
});

export default viewUploadSlice.reducer;
