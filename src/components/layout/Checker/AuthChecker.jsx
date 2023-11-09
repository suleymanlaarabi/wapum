import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const AuthChecker = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/sign-in" />;
  }
};

export default AuthChecker;
