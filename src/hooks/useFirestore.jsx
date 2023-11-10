import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  limit,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useQuery, useMutation, useQueryClient } from "react-query";

const useFirestore = (collectionName, userEmail, id) => {
  const queryClient = useQueryClient();

  const executeQuery = async (queryAction) => {
    try {
      return await queryAction();
    } catch (error) {
      console.error(
        "Erreur lors de l'exécution de la requête Firestore :",
        error
      );
      throw error;
    }
  };

  const getDocuments = async () => {
    const buildQuery = () => {
      if (id) {
        return doc(db, collectionName, id); // Construire une requête pour obtenir un document spécifique par ID
      }
      if (userEmail) {
        return query(
          collection(db, collectionName),
          where("userId", "==", userEmail)
        );
      }
      return query(collection(db, collectionName), limit(15)); // Requête par défaut pour obtenir les 15 premiers documents
    };

    return executeQuery(async () => {
      const q = buildQuery();

      if (id) {
        // Si un id est fourni, récupérez un seul document
        const docSnapshot = await getDoc(q);
        if (docSnapshot.exists()) {
          return [{ id: docSnapshot.id, ...docSnapshot.data() }];
        }
        return [];
      } else {
        // Sinon, exécutez une requête normale
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }
    });
  };
  const createDocument = async (docData) => {
    return executeQuery(async () => {
      const docRef = await doc(collection(db, collectionName));
      await setDoc(docRef, {
        ...docData,
        userId: userEmail,
      });
      return docRef;
    });
  };

  const deleteDocument = async (docId) => {
    return executeQuery(async () => {
      await deleteDoc(doc(db, collectionName, docId));
    });
  };

  const { data, isLoading, isError } = useQuery(
    [collectionName, userEmail],
    getDocuments
  );

  const createMutation = useMutation(createDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries([collectionName, userEmail]);
    },
  });

  const deleteMutation = useMutation(deleteDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries([collectionName, userEmail]);
    },
  });

  return {
    documents: data || [],
    isLoading,
    isError,
    error: isError ? "Erreur lors de la récupération des documents" : null,
    createDocument: createMutation.mutate,
    deleteDocument: deleteMutation.mutate,
  };
};

export default useFirestore;
