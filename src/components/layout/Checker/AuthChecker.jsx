import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

const AuthChecker = () => {
  const user = useUser();
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthChecker;
