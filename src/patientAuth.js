import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PatientAuth = () => {
  const location = useLocation();
  const { accountType } = useSelector((state) => state.root.loginReducer);
  console.log("accounttype", accountType);

  if (accountType !== "patient") {
    return (
      <>
        <Navigate to="/*" state={{ path: location.pathname }} />
      </>
    );
  }
  return <Outlet />;
};
