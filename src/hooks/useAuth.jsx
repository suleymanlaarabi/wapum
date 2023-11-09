import { useContext } from "react";
import { UserContext } from "../context/createContext/UserContext";

export const useAuth = () => {
  return useContext(UserContext);
};
