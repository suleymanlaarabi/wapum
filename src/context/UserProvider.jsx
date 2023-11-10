/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./createContext/UserContext";
import { useToast, Spinner, Flex } from "@chakra-ui/react";
import { firebaseErrorToast } from "../utils/helpers/firebase.helper";
import PageContainer from "../components/layout/Container/PageContainer";
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleError = (error) => toast(firebaseErrorToast(error));

  const handleAuth = async (authMethod, ...params) => {
    try {
      await authMethod(auth, ...params);
      navigate(-1);
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

  const updateUserProfile = async ({ photoURL, displayName }) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: photoURL ? photoURL : currentUser.photoURL,
        displayName: displayName ? displayName : currentUser.displayName,
      });
      setCurrentUser({
        ...currentUser,
        photoURL: photoURL ? photoURL : currentUser.photoURL,
        displayName: displayName ? displayName : currentUser.displayName,
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        register,
        registerWithGoogle,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {!isLoading ? (
        children
      ) : (
        <>
          <PageContainer>
            <Flex
              w="100%"
              h="100vh"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner height={100} w={100} />
            </Flex>
          </PageContainer>
        </>
      )}
    </UserContext.Provider>
  );
};
