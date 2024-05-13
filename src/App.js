import "./App.css";
// import Button from "@mui/material/Button";
import LoginPage from "./components/pages/loginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordPage from "./components/pages/Forgot-Pass";
import { AppRoutes } from "./constant/route";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import { ThemeProvider } from "@mui/material";
import { halloDocTheme } from "./doc.theme";
import ViewReservation from "./components/pages/Reservation/viewReservation";
import ViewNotes from "./components/pages/viewNotes/viewNotes";
import { BackLoginAuth } from "./BackLoginAuth";
import { RequireAuth } from "./RequireAuth";
import ViewUpload from "./components/pages/viewUpload/viewUpload";
import Order from "./components/pages/Orders/order";
import CloseCase from "./components/pages/closeCase/closeCase";
import MyProfile from "./components/pages/myProfile/myProfile";
import Header from "./components/Header/Header";
import { useState } from "react";
import Provide from "./components/pages/ProviderInformation/Provide";
import EditAccount from "./components/pages/EditAccount/EditAccount";
import ResetPass from "./components/pages/ResetPass";
import AccessAccount from "./components/pages/accessAccount/accessAccount";
import CreateAccess from "./components/pages/createAccess/createAccess";
import Scheduling from "./components/pages/scheduling/scheduling";
import RequestedShifts from "./components/pages/requestedShifts/requestedShifts";
import UserAccess from "./components/pages/userAccess/userAccess";
import ProviderCall from "./components/pages/providerCall/providerCall";
import CreateProvider from "./components/pages/createProvider/createProvider";
import ProviderLocation from "./components/pages/providerLocation/providerLocation";
import Partners from "./components/pages/partners/partners";
import AddBussiness from "./components/pages/addBussiness/addBussiness";
import Records from "./components/pages/records/records";
import PatientRecords from "./components/pages/patientRecords/patientRecords";
import SearchRecords from "./components/pages/searchRecords/searchRecords";
import EmailLogs from "./components/pages/emailLogs/emailLogs";
import SmsLogs from "./components/pages/smsLogs/smsLogs";
import BlockHistory from "./components/pages/blockHistory/blockHistory";
import CreateRequest from "./components/pages/createRequest/createRequest";
import PageNotFound from "./components/pages/pageNotFound/pageNotFound";
import ConcludeCare from "./components/pages/concludeCare/concludeCare";
import EncounterForm from "./components/pages/encounterForm/encounterForm";
import ProviderMyProfile from "./components/pages/providerMyProfile/providerMyProfile";
import MySchedule from "./components/pages/mySchedule/mySchedule";
import PatientPage from "./components/pages/patientPage/patientPage";
import SubmitRequest from "./components/pages/submitRequest/submitRequest";
import { CreatePatient } from "./components/pages/createPatient/createPatient";
import FamilyFriend from "./components/pages/familyFriend/familyFriend";
import ConciergePage from "./components/pages/conciergePage/conciergePage";
import BusinessPage from "./components/pages/businessPage/businessPage";
import MedicalHistory from "./components/pages/medicalHistory/medicalHistory";
import MeSubmitInformation from "./components/pages/submitInformation/meSubmitInformation";
import SomeOneElse from "./components/pages/submitInformation/someOneElse";
import PatientViewUpload from "./components/pages/patientViewUpload/patientViewUpload";
import Profile from "./components/pages/profile/profile";
import Agreement from "./components/pages/agreement/agreement";
import { AdminAuth } from "./adminAuth";
import { PhysicianAuth } from "./physicianAuth";
import { AdminPhysicianAuth } from "./adminPhysicianAuth";
import { PatientAuth } from "./patientAuth";
// import { useSelector } from "react-redux";

function App() {
  const [isDarktheme, setIsDarkTheme] = useState(false);
  const handleDarkMode = () => {
    setIsDarkTheme(!isDarktheme);
  };
  // const { accountType } = useSelector((state) => state.root.loginReducer);

  return (
    <BrowserRouter>
      <ThemeProvider theme={halloDocTheme(isDarktheme)}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route element={<BackLoginAuth />}>
            <Route path="/" element={<LoginPage />} />
            <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            <Route
              path={AppRoutes.FORGOTPASS}
              element={<ForgotPasswordPage />}
            />
            <Route path={AppRoutes.RESETPASS} element={<ResetPass />} />
          </Route>
          <Route
            element={
              <Header
                isDarktheme={isDarktheme}
                handleDarkMode={handleDarkMode}
              />
            }
          >
            <Route element={<RequireAuth />}>
              {/* Only admin can access */}
              <Route element={<AdminAuth />}>
                <Route path={AppRoutes.CLOSECASE} element={<CloseCase />} />
                <Route path={AppRoutes.MYPROFILE} element={<MyProfile />} />
                <Route path={AppRoutes.PROVIDER} element={<Provide />} />
                <Route path={AppRoutes.EDITACCOUNT} element={<EditAccount />} />
                <Route
                  path={AppRoutes.ACCESSACCOUNT}
                  element={<AccessAccount />}
                />
                <Route
                  path={AppRoutes.CREATEACCESS}
                  element={<CreateAccess />}
                />
                <Route path={AppRoutes.SCHEDULING} element={<Scheduling />} />
                <Route
                  path={AppRoutes.REQUESTED_SHIFTS}
                  element={<RequestedShifts />}
                />
                <Route path={AppRoutes.USERACCESS} element={<UserAccess />} />
                <Route
                  path={AppRoutes.PROVIDERCALL}
                  element={<ProviderCall />}
                />
                <Route
                  path={AppRoutes.CREATEPROVIDER}
                  element={<CreateProvider />}
                />
                <Route
                  path={AppRoutes.PROVIDERLOCATION}
                  element={<ProviderLocation />}
                />
                <Route path={AppRoutes.PARTNERS} element={<Partners />} />
                <Route
                  path={AppRoutes.ADDBUSSINESS}
                  element={<AddBussiness />}
                />
                <Route path={AppRoutes.PATIENTHISTORY} element={<Records />} />
                <Route
                  path={AppRoutes.PATIENTRECORDS}
                  element={<PatientRecords />}
                />
                <Route
                  path={AppRoutes.SEARCHRECORDS}
                  element={<SearchRecords />}
                />
                <Route path={AppRoutes.EMAILLOGS} element={<EmailLogs />} />
                <Route path={AppRoutes.SMSLOGS} element={<SmsLogs />} />
                <Route
                  path={AppRoutes.BLOCKHISTORY}
                  element={<BlockHistory />}
                />
              </Route>

              {/* Only Physician can access */}
              <Route element={<PhysicianAuth />}>
                <Route
                  path={AppRoutes.PROVIDERMYPROFILE}
                  element={<ProviderMyProfile />}
                />
                <Route
                  path={AppRoutes.CONCLUDECARE}
                  element={<ConcludeCare />}
                />
                <Route path={AppRoutes.MYSCHEDULE} element={<MySchedule />} />
              </Route>

              {/* Only Admin and Physician both are access */}
              <Route element={<AdminPhysicianAuth />}>
                <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
                <Route
                  path={AppRoutes.RESERVATION}
                  element={<ViewReservation />}
                />
                <Route path={AppRoutes.NOTES} element={<ViewNotes />} />
                <Route path={AppRoutes.VIEWUPLOAD} element={<ViewUpload />} />
                <Route path={AppRoutes.ORDER} element={<Order />} />
                <Route
                  path={AppRoutes.CREATEREQUEST}
                  element={<CreateRequest />}
                />
                <Route
                  path={AppRoutes.ENCOUNTERFORM}
                  element={<EncounterForm />}
                />
              </Route>

              {/* Only patieent can access */}
              <Route element={<PatientAuth />}>
                <Route
                  path={AppRoutes.MEDICALHISTORY}
                  element={<MedicalHistory />}
                />
                <Route
                  path={AppRoutes.PATIENTVIEWUPLOAD}
                  element={<PatientViewUpload />}
                />
                <Route path={AppRoutes.PROFILE} element={<Profile />} />

                <Route
                  path={AppRoutes.MESUBMIT}
                  element={<MeSubmitInformation />}
                />
                <Route path={AppRoutes.SOMEONEELSE} element={<SomeOneElse />} />
              </Route>
            </Route>
            <Route path={AppRoutes.PATIENTSITE} element={<PatientPage />} />
            <Route path={AppRoutes.SUBMITREQUEST} element={<SubmitRequest />} />
            <Route path={AppRoutes.PATIENTCREATE} element={<CreatePatient />} />
            <Route
              path={AppRoutes.CREATEFAMILFRIEND}
              element={<FamilyFriend />}
            />
            <Route path={AppRoutes.CONCIERGE} element={<ConciergePage />} />
            <Route path={AppRoutes.BUSINESS} element={<BusinessPage />} />
          </Route>
          <Route path={AppRoutes.AGREEMENT} element={<Agreement />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
