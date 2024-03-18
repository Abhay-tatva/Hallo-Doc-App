import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import newStateSlice from "./newStateSlice";
import viewCaseSlice from "./viewCaseSlice";
import viewNotesSlice from "./viewNotesSlice";
import cancelCaseSlice from "./cancelCaseSlice";
import regionPhysicianSlice from "./regionPhysicianSlice";
import requestCountSlice from "./requestCountSlice";
import viewUploadSlice from "./viewUploadSlice";

export const rootReducer = combineReducers({
  loginReducer: loginSlice,
  newStateReducer: newStateSlice,
  viewCaseReducer: viewCaseSlice,
  viewNotesReducer: viewNotesSlice,
  cancelCaseReducer: cancelCaseSlice,
  regionPhysicianReducer: regionPhysicianSlice,
  requestCountReducer: requestCountSlice,
  viewuploadReducer: viewUploadSlice,
});
