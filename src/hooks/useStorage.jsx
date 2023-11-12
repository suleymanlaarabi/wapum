import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config";
import useAuth from "./useAuth";

const useStorage = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const auth = useAuth();
  const { currentUser } = auth || {};

  const uploadFile = (file, dir, fileName) => {
    if (file) {
      // Création d'une référence de stockage
      const storageRef = ref(
        storage,
        `users/${currentUser.email}/${dir}/${fileName}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      setIsLoading(true);
      uploadTask.on(
        "state_changed",
        () => {
          // Suivi de la loadingion du téléchargement
        },
        (err) => {
          // Gestion des erreurs
          setError(err);
        },
        () => {
          // Récupération de l'URL de téléchargement
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            setIsLoading(false);
          });
        }
      );
    }
  };

  return { uploadFile, isLoading, url, error };
};

export default useStorage;
