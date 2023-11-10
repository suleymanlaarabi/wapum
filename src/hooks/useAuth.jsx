import { useContext } from "react";
import { UserContext } from "../context/createContext/UserContext";
const useAuth = () => {
  return useContext(UserContext);
};
export default useAuth;
