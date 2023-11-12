import {
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

import { BiMessageAdd } from "react-icons/bi";
const ConversationsNav = ({ openModal }) => {
  return (
    <>
      <Flex
        height={75}
        bg={useColorModeValue("white", "gray.700")}
        px={4}
        boxShadow="lg"
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"full"}
      >
        <Text fontSize="2xl">Conversations</Text>
        <HStack spacing={8} alignItems={"center"}>
          <IconButton
            onClick={openModal}
            size={"md"}
            icon={<BiMessageAdd fontSize={30} />}
            aria-label={"Open Menu"}
            variant="ghost"
          />
        </HStack>
      </Flex>
    </>
  );
};

export default ConversationsNav;
