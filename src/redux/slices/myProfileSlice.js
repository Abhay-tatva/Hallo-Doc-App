import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile } from "../myProfile/myProfileApi";

const myProfileSlice = createSlice({
  name: "myProfile",
  initialState: {
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload.data[0];
      }
    });
  },
});

export default myProfileSlice.reducer;
