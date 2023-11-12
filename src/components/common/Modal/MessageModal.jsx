import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  FormControl,
} from "@chakra-ui/react";
import { useRef } from "react";
const MessageModal = ({ isOpen, onClose, title, onConfirm, placeHolder }) => {
  const inputRef = useRef();
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="text">
              <Textarea placeholder={placeHolder} ref={inputRef} type="text" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                onConfirm(inputRef.current.value);
                onClose();
              }}
              variant="accent"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MessageModal;
