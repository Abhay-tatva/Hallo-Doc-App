/* eslint-disable camelcase */

import { createSlice } from "@reduxjs/toolkit";

import { getBusinessView, getPartners } from "../partners/partnersApi";

const partners = createSlice({
  name: "partners",
  initialState: {
    partnersList: [],
    businessView: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getPartners.fulfilled, (state, action) => {
      if (action.payload) {
        state.partnersList = action.payload;
      }
    });
    builder.addCase(getBusinessView.fulfilled, (state, action) => {
      if (action.payload) {
        state.businessView = action.payload.data[0];
      }
    });
  },
  reducers: {
    clearPartnersData: (state) => {
      state.businessView = {};
    },
  },
});

export default partners.reducer;
export const { clearPartnersData } = partners.actions;
