const createToast = (title, description, status) => ({
  title,
  description,
  status,
  duration: 5000,
  position: "top-right",
  isClosable: true,
});

export const firebaseErrorToast = (error) => {
   
  return createToast("Error", error.message.match(/auth\/(.*)\)/)[1];, "error");
};

export const firebaseSuccessToast = (message) => {
  return createToast("Success", message, "success");
};
