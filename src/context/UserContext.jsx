/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const register = async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      setCurrentUser(user);
      navigate("/private/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
