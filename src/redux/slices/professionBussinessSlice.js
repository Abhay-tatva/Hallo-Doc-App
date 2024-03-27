import { createSlice } from "@reduxjs/toolkit";
import {
  sendOrderBussiness,
  sendOrderProfession,
} from "../professionBussiness/getProfessionBussinessApi";

const professionBussinessSlice = createSlice({
  name: "professionBussiness",
  initialState: {
    professions: [],
    bussinesses: [],
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrderProfession.fulfilled, (state, action) => {
      if (action.payload) {
        state.professions = action.payload.data;
      }
    });
    builder.addCase(sendOrderBussiness.fulfilled, (state, action) => {
      if (action.payload) {
        state.bussinesses = action.payload.businesses;
      }
    });
  },
});

export default professionBussinessSlice.reducer;
