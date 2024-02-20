import "./App.css";
// import Button from "@mui/material/Button";
import LoginPage from "./components/pages/loginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordPage from "./components/pages/Forgot-Pass";
import { AppRoutes } from "./components/constant/route";
import Dashboard from "./components/pages/Dashboard";
import { ThemeProvider } from "@mui/material";
import { halloDocTheme } from "./doc.theme";
import ViewReservation from "./components/pages/Reservation/viewReservation";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={halloDocTheme}>
        <Routes>
          {/* <div className="App"> */}
          <Route exact path="/" element={<LoginPage />} />
          <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
          <Route path={AppRoutes.FORGOTPASS} element={<ForgotPasswordPage />} />
          <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
          {/* <Route path={AppRoutes.DASHBOARDMAIN} element={<Dashboard />} /> */}
          <Route path={AppRoutes.RESERVATION} element={<ViewReservation />} />

          {/* </div> */}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
