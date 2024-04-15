import { createSlice } from "@reduxjs/toolkit";
import { newState } from "../newState/newStateApi";
import { providerDashBoard } from "../Provider Site/providerDashBoard/providerDashBoardApi";

const newStateSlice = createSlice({
  name: "NewState",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(newState.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
    builder.addCase(providerDashBoard.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default newStateSlice.reducer;
