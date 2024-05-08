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
import partnersSlice from "./partnersSlice";
import schedulingSlice from "./schedulingSlice";
// import encounterSlice from "./physicianSlice/encounterSlice";
import physicianMyProfileSlice from "./physicianSlice/physicianMyProfileSlice";
import myScheduleSlice from "./physicianSlice/myScheduleSlice";
import medicalHistorySlice from "./patientSlice/medicalHistorySlice";
import patientViewUpload from "./patientSlice/patientViewUpload";
import viewProfileSlice from "./patientSlice/viewProfileSlice";

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
  partnersReducer: partnersSlice,
  schedulingReducer: schedulingSlice,
  // .................................physican SixteenMp............................
  // encounterReducer: encounterSlice,
  physicanMyProfileReducer: physicianMyProfileSlice,
  myScheduleReducer: myScheduleSlice,

  // ....................................patient Site...............................
  medicalHistoryReducer: medicalHistorySlice,
  patientViewUploadReducer: patientViewUpload,
  viewProfileReducer: viewProfileSlice,
});
