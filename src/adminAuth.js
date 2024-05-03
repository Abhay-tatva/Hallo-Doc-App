import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminAuth = () => {
  const location = useLocation();
  const { accountType } = useSelector((state) => state.root.loginReducer);

  if (accountType !== "admin") {
    return (
      <>
        <Navigate to="/*" state={{ path: location.pathname }} />
      </>
    );
  }
  return <Outlet />;
};
