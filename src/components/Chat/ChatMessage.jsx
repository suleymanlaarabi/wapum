import { Text, VStack, HStack, useColorModeValue } from "@chakra-ui/react";

const ChatMessage = ({ message, isDestinataire, date }) => {
  const bgColorLight = useColorModeValue(
    isDestinataire ? "blue.100" : "purple.100",
    isDestinataire ? "blue.600" : "purple.600"
  );
  const bgColorDark = useColorModeValue(
    isDestinataire ? "blue.700" : "purple.700",
    isDestinataire ? "blue.300" : "purple.300"
  );
  const textColor = useColorModeValue("black", "white");
  const textColorSender = useColorModeValue("white", "black");

  return (
    <HStack
      justifyContent={isDestinataire ? "flex-start" : "flex-end"}
      width="full"
    >
      {isDestinataire && (
        <Text m={0} fontSize="xs">
          {date}
        </Text>
      )}
      <VStack
        alignItems={isDestinataire ? "flex-start" : "flex-end"}
        bg={isDestinataire ? bgColorLight : bgColorDark}
        color={isDestinataire ? textColor : textColorSender}
        padding="3"
        borderRadius="lg"
        boxShadow="md"
        w="60%"
      >
        <Text fontSize="md">{message}</Text>
      </VStack>
      {!isDestinataire && (
        <Text m={0} fontSize="xs">
          {date}
        </Text>
      )}
    </HStack>
  );
};

export default ChatMessage;
