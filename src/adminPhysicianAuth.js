import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminPhysicianAuth = () => {
  const location = useLocation();
  const { accountType } = useSelector((state) => state.root.loginReducer);

  if (accountType !== "admin" && accountType !== "physician") {
    return (
      <>
        <Navigate to="/*" state={{ path: location.pathname }} />
      </>
    );
  }
  return <Outlet />;
};
