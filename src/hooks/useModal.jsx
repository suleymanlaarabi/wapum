import { useDisclosure } from "@chakra-ui/react";
const useModal = (ChildModal, props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const Modal = () => (
    <ChildModal {...props} isOpen={isOpen} onClose={onClose} />
  );
  return { Modal, onOpen };
};

export default useModal;
