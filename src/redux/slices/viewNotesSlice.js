import { createSlice } from "@reduxjs/toolkit";
import { viewNotes } from "../viewNotes/viewNotesApi";

const viewNotesSlice = createSlice({
  name: "viewNotes",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(viewNotes.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default viewNotesSlice.reducer;
