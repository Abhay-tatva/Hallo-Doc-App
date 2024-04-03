/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import {
  accountAccessEdit,
  getAccountAccess,
} from "../accountAccess/accountAccessApi";

const accountAccess = createSlice({
  name: "accountAccess",
  initialState: {
    accountData: [],
    createData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAccountAccess.fulfilled, (state, action) => {
      if (action.payload) {
        state.accountData = action.payload.data;
      }
    });
    builder.addCase(accountAccessEdit.fulfilled, (state, action) => {
      if (action.payload) {
        state.createData = action.payload.data;
      }
    });
  },
});

export default accountAccess.reducer;
