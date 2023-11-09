import { useState } from "react";
import { useAuth } from "./useAuth";
import { firestore } from "../../firebase.config";
import { useEffect } from "react";

function useUserFirestore() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userDocument, setUserDocument] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userDocumentRef = firestore
        .collection("users")
        .doc(currentUser.email);
      const unsubscribe = userDocumentRef.onSnapshot((doc) => {
        if (doc.exists) {
          setUserDocument(doc.data());
        } else {
          setUserDocument(null);
        }
      });
      return unsubscribe;
    }
  }, [currentUser]);

  const updateUserDocument = async (document) => {
    setLoading(true);
    const userDocumentRef = firestore
      .collection("users")
      .doc(currentUser.email);
    try {
      await userDocumentRef.set(document);
      setUserDocument(document);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
      setLoading(false);
      throw error;
    }
  };

  return { userDocument, loading, updateUserDocument };
}

export default useUserFirestore;
