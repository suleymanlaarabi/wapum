const createToast = (title, description, status) => ({
  title,
  description,
  status,
  duration: 5000,
  position: "top-right",
  isClosable: true,
});

export const firebaseErrorToast = (error) => {
  const message = error.message.match(/auth\/(.*)\)/)[1];
  return createToast("Error", message, "error");
};

export const firebaseSuccessToast = (message) => {
  return createToast("Success", message, "success");
};
