import { getUserAccess } from "../userAccess/userAccessApi";
import { createSlice } from "@reduxjs/toolkit";

const userAccess = createSlice({
  name: "userAccess",
  initialState: {
    userAccessData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAccess.fulfilled, (state, action) => {
      if (action.payload) {
        state.userAccessData = action.payload;
      }
    });
  },
});

export default userAccess.reducer;
