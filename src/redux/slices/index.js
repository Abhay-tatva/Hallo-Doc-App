import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import newStateSlice from "./newStateSlice";
import viewCaseSlice from "./viewCaseSlice";
import viewNotesSlice from "./viewNotesSlice";
import cancelCaseSlice from "./cancelCaseSlice";
import regionPhysicianSlice from "./regionPhysicianSlice";

export const rootReducer = combineReducers({
  loginReducer: loginSlice,
  newStateReducer: newStateSlice,
  viewCaseReducer: viewCaseSlice,
  viewNotesReducer: viewNotesSlice,
  cancelCaseReducer: cancelCaseSlice,
  regionPhysicianReducer: regionPhysicianSlice,
});
