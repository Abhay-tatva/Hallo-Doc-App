import { createSlice } from "@reduxjs/toolkit";
import { viewNotes } from "../viewNotes/viewNotesApi";
import { physicianViewNotes } from "../Provider Site/ViewNotes/physicianViewNotesApi";

const viewNotesSlice = createSlice({
  name: "viewNotes",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(viewNotes.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action?.payload;
        return { ...state, data };
      }
    });
    builder.addCase(physicianViewNotes.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action?.payload;
        return { ...state, data };
      }
    });
  },
});

export default viewNotesSlice.reducer;
