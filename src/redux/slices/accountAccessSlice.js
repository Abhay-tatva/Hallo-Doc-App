/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";
import {
  accountAccessEdit,
  getAccountAccess,
  getAccountAccessList,
} from "../accountAccess/accountAccessApi";

const accountAccess = createSlice({
  name: "accountAccess",
  initialState: {
    accountData: [],
    createData: {},
    accountListData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAccountAccess.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log("accces account", action.payload);
        state.accountData = action.payload.data;
      }
    });
    builder.addCase(accountAccessEdit.fulfilled, (state, action) => {
      if (action.payload) {
        state.createData = action.payload.data[0];
      }
    });
    builder.addCase(getAccountAccessList.fulfilled, (state, action) => {
      if (action.payload) {
        state.accountListData = action.payload.data;
      }
    });
  },
  reducers: {
    clearCreateData: (state) => {
      state.createData = {};
    },
  },
});

export default accountAccess.reducer;
export const { clearCreateData } = accountAccess.actions;
