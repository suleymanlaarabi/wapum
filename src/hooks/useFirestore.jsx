import { useState } from "react";
import { db } from "../../firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";
const useFirestore = (collectionName) => {
  const [loading, setLoading] = useState(false);

  const getDocumentsByUserEmail = async (userEmail) => {
    setLoading(true);

    try {
      const documents = await db
        .collection(collectionName)
        .where("userId", "==", userEmail)
        .get();

      setLoading(false);
      return documents;
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
      setLoading(false);
      throw error;
    }
  };

  // Fonction pour créer un document
  const createDocument = async (docData) => {
    setLoading(true);
    try {
      const docRef = await doc(collection(db, collectionName));
      await setDoc(docRef, docData);
      setLoading(false);
      return docRef;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Fonction pour supprimer un document
  const deleteDocument = async (userEmail) => {
    setLoading(true);
    try {
      await db.collection(collectionName).doc(userEmail).delete();
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
      setLoading(false);
      throw error;
    }
  };

  return { loading, getDocumentsByUserEmail, createDocument, deleteDocument };
};

export default useFirestore;
