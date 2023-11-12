import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const createToast = (title, description, status) => ({
  title,
  description,
  status,
  duration: 5000,
  position: "top-right",
  isClosable: true,
});

export const firebaseErrorToast = (error) => {
  return createToast("Error", error.message.match(/auth\/(.*)\)/)[1], "error");
};

export const firebaseSuccessToast = (message) => {
  return createToast("Success", message, "success");
};

export const fetchProfileImageUrl = async (userEmail) => {
  const storage = getStorage();
  const imagePath = `/users/${userEmail}/profile/profile.png`;
  const imageRef = ref(storage, imagePath);

  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'URL de l'image :",
      error
    );
    // Gérer l'erreur, par exemple, retourner une URL d'image par défaut si nécessaire
  }
};
