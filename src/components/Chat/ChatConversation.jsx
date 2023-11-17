/* eslint-disable react-hooks/exhaustive-deps */
import { VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import useAuth from "../../hooks/useAuth";
import { useRef } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";

const ChatConversation = ({ messages, loadMore }) => {
  const { currentUser } = useAuth();
  
  return (
    
  );
};

export default ChatConversation;
