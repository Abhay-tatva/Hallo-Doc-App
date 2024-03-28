import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile } from "../myProfile/myProfileApi";

const myProfileSlice = createSlice({
  name: "myProfile",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default myProfileSlice.reducer;
