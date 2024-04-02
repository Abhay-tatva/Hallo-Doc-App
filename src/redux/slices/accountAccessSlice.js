/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import { getAccountAccess } from "../accountAccess/accountAccessApi";

const accountAccess = createSlice({
  name: "accountAccess",
  initialState: {
    accountData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAccountAccess.fulfilled, (state, action) => {
      if (action.payload) {
        state.accountData = action.payload.data;
      }
    });
  },
});

export default accountAccess.reducer;
