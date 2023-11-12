import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useQuery, useMutation, useQueryClient } from "react-query";

const useFirestore = (collectionName, customQuery, key) => {
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
    return executeQuery(async () => {
      const q = customQuery;
      if (q) {
        if (q.type == "query") {
          const querySnapshot = await getDocs(q);
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } else {
          // just get doc
          const docRef = await getDoc(q);
          return [{ id: docRef.id, ...docRef.data() }];
        }
      }
    });
  };
  const createDocument = async (docData) => {
    return await executeQuery(async () => {
      const docRef = await doc(collection(db, collectionName));
      await setDoc(docRef, docData);
      return docRef;
    });
  };

  const deleteDocument = async (docId) => {
    return executeQuery(async () => {
      await deleteDoc(doc(db, collectionName, docId));
    });
  };

  const { data, isLoading, isError } = useQuery(
    [collectionName, customQuery],
    getDocuments,
    {
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );

  const createMutation = useMutation(createDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(key ? key : [collectionName]);
    },
  });

  const deleteMutation = useMutation(deleteDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(key ? key : [collectionName]);
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
