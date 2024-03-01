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
import { BackLoginAuth } from "./BackLoginAuth";
import { RequireAuth } from "./RequireAuth";
import ViewUpload from "./components/pages/viewUpload/viewUpload";
import Order from "./components/pages/Orders/order";
import CloseCase from "./components/pages/closeCase/closeCase";
import MyProfile from "./components/pages/myProfile/myProfile";
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  const [isDarktheme, setIsDarkTheme] = useState(false);
  const handleDarkMode = () => {
    setIsDarkTheme(!isDarktheme);
  };
  return (
    <BrowserRouter>
      <ThemeProvider theme={halloDocTheme(isDarktheme)}>
        <Routes>
          <Route element={<BackLoginAuth />}>
            <Route path="/" element={<LoginPage />} />
            <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            <Route
              path={AppRoutes.FORGOTPASS}
              element={<ForgotPasswordPage />}
            />
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              element={
                <Header
                  isDarktheme={isDarktheme}
                  handleDarkMode={handleDarkMode}
                />
              }
            >
              <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
              <Route
                path={AppRoutes.RESERVATION}
                element={<ViewReservation />}
              />
              <Route path={AppRoutes.NOTES} element={<ViewNotes />} />
              <Route path={AppRoutes.VIEWUPLOAD} element={<ViewUpload />} />
              <Route path={AppRoutes.ORDER} element={<Order />} />
              <Route path={AppRoutes.CLOSECASE} element={<CloseCase />} />
              <Route path={AppRoutes.MYPROFILE} element={<MyProfile />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
