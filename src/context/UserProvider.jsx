/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./createContext/UserContext";
import { useToast } from "@chakra-ui/react";
import { firebaseErrorToast } from "../utils/helpers/firebase.helper";

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const toast = useToast();

  const handleError = (error) => toast(firebaseErrorToast(error));

  const handleAuth = async (authMethod, ...params) => {
    try {
      await authMethod(auth, ...params);
      navigate("/private/profile");
    } catch (error) {
      handleError(error);
    }
  };

  const registerWithGoogle = () =>
    handleAuth(signInWithPopup, new GoogleAuthProvider());
  const register = (email, password) =>
    handleAuth(createUserWithEmailAndPassword, email, password);
  const login = (email, password) =>
    handleAuth(signInWithEmailAndPassword, email, password);

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  const updateProfile = async ({ displayName, photoURL }) => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setCurrentUser(auth);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        register,
        registerWithGoogle,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
