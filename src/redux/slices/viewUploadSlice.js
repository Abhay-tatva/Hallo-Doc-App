import { createSlice } from "@reduxjs/toolkit";
import { viewUpload } from "../viewUpload/viewUploadApi";

const viewUploadSlice = createSlice({
  name: "viewUpload",
  initialState: { uploadFile: [] },
  extraReducers: (builder) => {
    builder.addCase(viewUpload.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("action.payload", action.payload);
        state.uploadFile = action.payload.data;
      }
    });
  },
});

export default viewUploadSlice.reducer;
