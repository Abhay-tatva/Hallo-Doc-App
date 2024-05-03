import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PhysicianAuth = () => {
  const location = useLocation();
  const { accountType } = useSelector((state) => state.root.loginReducer);

  if (accountType !== "physician") {
    return (
      <>
        <Navigate to="/*" state={{ path: location.pathname }} />
      </>
    );
  }
  return <Outlet />;
};
