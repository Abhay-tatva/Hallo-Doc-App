import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import newStateSlice from "./newStateSlice";
import viewCaseSlice from "./viewCaseSlice";
import viewNotesSlice from "./viewNotesSlice";
import cancelCaseSlice from "./cancelCaseSlice";
import regionPhysicianSlice from "./regionPhysicianSlice";
import requestCountSlice from "./requestCountSlice";
import viewUploadSlice from "./viewUploadSlice";
import blockCaseSlice from "./blockCaseSlice";
import commonSlice from "./commonSlice";
import professionBussinessSlice from "./professionBussinessSlice";
import closeCaseSlice from "./closeCaseSlice";
import myProfileSlice from "./myProfileSlice";
import accountAccessSlice from "./accountAccessSlice";
import providerSlice from "./providerSlice";
import userAccessSlice from "./userAccessSlice";
import recordsSlice from "./recordsSlice";

export const rootReducer = combineReducers({
  loginReducer: loginSlice,
  newStateReducer: newStateSlice,
  viewCaseReducer: viewCaseSlice,
  viewNotesReducer: viewNotesSlice,
  cancelCaseReducer: cancelCaseSlice,
  regionPhysicianReducer: regionPhysicianSlice,
  requestCountReducer: requestCountSlice,
  viewuploadReducer: viewUploadSlice,
  blockCaseReducer: blockCaseSlice,
  commonReducer: commonSlice,
  professionBussinessReducer: professionBussinessSlice,
  closeCaseReducer: closeCaseSlice,
  myProfileReducer: myProfileSlice,
  accountAccessReducer: accountAccessSlice,
  providerMenuReducer: providerSlice,
  userAccessReducer: userAccessSlice,
  recordsReducer: recordsSlice,
});
