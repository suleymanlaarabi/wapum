/* eslint-disable react-hooks/exhaustive-deps */
import { getDocs, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

const useRealtimeFirestore = (collectionName, customQuery, key) => {
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

  // get realtime update of the query
  useEffect(() => {
    const unsubscribe = onSnapshot(customQuery, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("documents", documents);
      queryClient.setQueryData(key || [collectionName], documents);
    });
    return () => unsubscribe();
  }, [queryClient]);

  const { data, isLoading, isError } = useQuery(
    key || [collectionName],
    getDocuments,
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const addDataToDocuments = (newData) => {
    queryClient.setQueryData(key || [collectionName], [
      ...newData,
      ...(data || []),
    ]);
  };

  return {
    documents: data || [],
    isLoading,
    isError,
    error: isError ? "Erreur lors de la récupération des documents" : null,
    addDataToDocuments,
  };
};

export default useRealtimeFirestore;
