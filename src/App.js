import "./App.css";
// import Button from "@mui/material/Button";
import LoginPage from "./components/pages/loginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordPage from "./components/pages/Forgot-Pass";
import { AppRoutes } from "./constant/route";
import Dashboard from "./components/pages/Dashboard";
import { ThemeProvider } from "@mui/material";
import { halloDocTheme } from "./doc.theme";
import ViewReservation from "./components/pages/Reservation/viewReservation";
import ViewNotes from "./components/pages/viewNotes/viewNotes";
import { AuthProvider } from "./auth";
import { RequireAuth } from "./RequireAuth";
import ViewUpload from "./components/pages/viewUpload/viewUpload";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={halloDocTheme}>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            <Route
              path={AppRoutes.FORGOTPASS}
              element={<ForgotPasswordPage />}
            />

            <Route
              path={AppRoutes.DASHBOARD}
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path={AppRoutes.RESERVATION} element={<ViewReservation />} />
            <Route path={AppRoutes.NOTES} element={<ViewNotes />} />
            <Route path={AppRoutes.VIEWUPLOAD} element={<ViewUpload />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
