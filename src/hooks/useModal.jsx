import { useDisclosure } from "@chakra-ui/react";
const useModal = (ChildModal) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const Modal = () => <ChildModal isOpen={isOpen} onClose={onClose} />;
  return { Modal, onOpen };
};

export default useModal;
