import useAuth from "./useAuth"; // Assurez-vous que le chemin est correct
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useQuery, useQueryClient, useMutation } from "react-query";
const useUserDocument = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const fetchUserDocument = async () => {
    if (!currentUser?.email) {
      throw new Error("Aucun utilisateur connecté");
    }

    const docRef = doc(db, "users", currentUser.email);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Créer le document utilisateur s'il n'existe pas
      await setDoc(docRef, {
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        conversations: [],
      });
      return {
        id: docRef.id,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        conversations: [],
      };
    }

    return { id: docSnap.id, ...docSnap.data() };
  };

  const {
    data: document,
    isLoading,
    isError,
  } = useQuery(["userDocument", currentUser?.email], fetchUserDocument, {
    enabled: !!currentUser?.email, // Exécuter la requête uniquement si currentUser.email est disponible
  });

  const updateUserDocumentMutation = useMutation(
    async (newData) => {
      if (!currentUser?.email) {
        throw new Error("Aucun utilisateur connecté");
      }

      const docRef = doc(db, "users", currentUser.email);
      await updateDoc(docRef, newData);
      return newData;
    },
    {
      onSuccess: (newData) => {
        queryClient.setQueryData(
          ["userDocument", currentUser?.email],
          (oldData) => {
            return { ...oldData, ...newData };
          }
        );
      },
    }
  );

  const updateUserDocument = (newData) => {
    updateUserDocumentMutation.mutate(newData);
  };

  return { document, updateUserDocument, isLoading, isError };
};

export default useUserDocument;
