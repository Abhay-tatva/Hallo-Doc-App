import { createSlice } from "@reduxjs/toolkit";
import { getSendOrder } from "../sendOrder/sendOrderApi";

const sendOrder = createSlice({
  name: "sendOrder",
  initialState: {
    business_contact: "",
    email: "",
    fax_number: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getSendOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.business_contact = action.payload.data[0].business_contact;
        state.email = action.payload.data[0].email;
        state.fax_number = action.payload.data[0].fax_number;
      }
    });
  },
});

export default sendOrder.reducer;
