import { Text, Flex, Button, Input } from "@chakra-ui/react";
import useMessages from "../../../../hooks/useMessages";
import { useRef } from "react";
import ChatConversation from "../../../Chat/ChatConversation";
import { useParams } from "react-router-dom";
const Conversation = () => {
  const { id } = useParams();
  const { messages, sendMessage, fetchNewMessages } = useMessages(id);
  const inputRef = useRef();

  const handleSend = () => {
    sendMessage(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <>
      <Flex height={"85vh"} maxW={"600px"} w="full" direction={"column"}>
        <Text m={5}>{id}</Text>
        <ChatConversation
          loadMore={fetchNewMessages}
          messages={messages || []}
        />
        <Flex p={4} gap={3}>
          <Input w={"full"} ref={inputRef} />
          <Button variant="accent" onClick={handleSend}>
            Envoyer
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Conversation;
