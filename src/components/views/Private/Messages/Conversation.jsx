/* eslint-disable react-hooks/exhaustive-deps */
import { Text, Flex, Button, Input, VStack, Spinner } from "@chakra-ui/react";
import useMessages from "../../../../hooks/useMessages";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import dayjs from "dayjs";

import ChatMessage from "../../../Chat/ChatMessage";

const Conversation = () => {
  const { id } = useParams();
  const { messages, sendMessage, fetchNewMessages } = useMessages(id);
  const inputRef = useRef();
  const messageBoxRef = useRef();
  const { currentUser } = useAuth();
  const spinnerRef = useRef();

  const handleSend = () => {
    sendMessage(inputRef.current.value);
    inputRef.current.value = "";
  };
  let showSpinner = false;
  if (messages.length > 12) {
    showSpinner = true;
  }
  const handleScroll = async () => {
    const scrollTop = messageBoxRef.current.scrollTop;
    if (scrollTop === 0) {
      await fetchNewMessages(messageBoxRef);
      messageBoxRef.current.scrollTop = 230;
    }
    if (scrollTop <= 230) {
      // upgrade the spinner scale to 2 progressively scrollTop is 0
      const scale = (230 - scrollTop) / 100;
      spinnerRef.current.style.scale = scale;
    }
  };

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.addEventListener("scroll", handleScroll);

      return () => {
        messageBoxRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [fetchNewMessages]);

  useEffect(() => {
    if (messages?.length <= 13) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Flex height={"85vh"} maxW={"600px"} w="full" direction={"column"}>
        <Text m={5}>{id}</Text>
        <VStack
          height="calc(100vh - 200px)"
          overflowY={"auto"}
          spacing={4}
          width="full"
          padding={5}
          alignItems="stretch"
          ref={messageBoxRef}
        >
          <Flex
            display={showSpinner ? "flex" : "none"}
            align={"flex-end"}
            minH={"230px"}
            justify={"center"}
            w={"full"}
          >
            <Spinner mb={50} height={30} w={30} ref={spinnerRef} />
          </Flex>
          {messages.length === 0 && (
            <Text textAlign={"center"}>Aucun message pour le moment</Text>
          )}
          {messages.map((msg) => {
            let isDestinataire = false;
            if (msg.sender === currentUser.email) {
              isDestinataire = true;
            }
            const date = dayjs(msg.timestamp).format("HH:mm");
            return (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isDestinataire={!isDestinataire}
                date={date ? date : "00:00"}
              />
            );
          })}
        </VStack>

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
