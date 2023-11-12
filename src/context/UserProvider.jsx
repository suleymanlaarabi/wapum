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
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, storage } from "../../firebase.config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./createContext/UserContext";
import { useToast, Spinner, Flex } from "@chakra-ui/react";
import {
  fetchProfileImageUrl,
  firebaseErrorToast,
  firebaseSuccessToast,
} from "../utils/helpers/firebase.helper";
import PageContainer from "../components/layout/Container/PageContainer";
import { ref, uploadBytesResumable } from "firebase/storage";
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        if (user.email) {
          console.log("user.email", user.email);
          fetchProfileImageUrl(user.email).then((url) => {
            if (!url) {
              const { photoURL } = user;
              const storageRef = ref(
                storage,
                `users/${user.email}/profile/profile.png`
              );
              const file = photoURL;
              // downlaod file
              fetch(file)
                .then((res) => res.blob())
                .then((blob) => {
                  // upload file
                  uploadBytesResumable(storageRef, blob).then(() => {
                    // update user profile
                    updateProfile(user, {
                      photoURL: `https://firebasestorage.googleapis.com/v0/b/${
                        storageRef.bucket
                      }/o/${encodeURIComponent(storageRef.fullPath)}?alt=media`,
                    }).then(() => {
                      setIsLoading(false);
                    });
                  });
                });
            }
          });
        }
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleError = (error) => toast(firebaseErrorToast(error));

  const handleAuth = async (authMethod, ...params) => {
    try {
      await authMethod(auth, ...params);
      toast(firebaseSuccessToast("Success"));
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

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast(firebaseSuccessToast("Reset password email sent"));
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
      toast(firebaseSuccessToast("Profile updated"));
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
        resetPassword,
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
