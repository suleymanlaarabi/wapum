/* eslint-disable react-hooks/exhaustive-deps */
import { VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import useAuth from "../../hooks/useAuth";
import { useRef } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";

const ChatConversation = ({ messages, loadMore }) => {
  const { currentUser } = useAuth();
  const messageBoxRef = useRef();
  const handleScroll = async () => {
    const scrollTop = messageBoxRef.current.scrollTop;
    if (scrollTop === 0) {
      await loadMore();
    }
  };

  useEffect(() => {
    // Ajouter le gestionnaire d'événements lors du montage du composant
    if (messageBoxRef.current) {
      messageBoxRef.current.addEventListener("scroll", handleScroll);

      // Nettoyer le gestionnaire d'événements lors du démontage du composant
      return () => {
        messageBoxRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loadMore]);

  useEffect(() => {
    // Faire défiler la boîte de messages vers le bas lorsque de nouveaux messages sont chargés
    messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
  }, [messages]);
  return (
    <VStack
      height="calc(100vh - 200px)"
      overflowY={"auto"}
      spacing={4}
      width="full"
      padding={5}
      alignItems="stretch"
      ref={messageBoxRef}
    >
      {messages.map((msg, index) => {
        let isDestinataire = false;
        if (msg.sender === currentUser.email) {
          isDestinataire = true;
        }
        const date = dayjs(msg.timestamp).format("HH:mm");
        return (
          <ChatMessage
            key={index}
            message={msg.message}
            isDestinataire={!isDestinataire}
            date={date ? date : "00:00"}
          />
        );
      })}
    </VStack>
  );
};

export default ChatConversation;
