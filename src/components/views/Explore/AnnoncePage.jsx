/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";

import { BiMessageDetail } from "react-icons/bi";

import useFirestore from "../../../hooks/useFirestore";
import useAuth from "../../../hooks/useAuth";
const AnnoncePage = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const { documents, isLoading } = useFirestore("annonces", null, id);
  const { title, description, price, images } = documents[0]
    ? documents[0]
    : {};

  // all color used useColorModeValue
  const textColor = useColorModeValue("gray.900", "gray.50");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={images[0]}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {title}
              </Heading>
              <Text color={textColor} fontWeight={300} fontSize={"2xl"}>
                ${price} USD
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<StackDivider borderColor={borderColor} />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"lg"}>{description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={textColor}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Features
                </Text>

                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={10}
                ></SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={textColor}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Details
                </Text>
              </Box>
            </Stack>

            <Button colorScheme="green" gap={3}>
              Contact the seller <BiMessageDetail fontSize={20} />
            </Button>
            {currentUser && currentUser.email === documents[0].userId && (
              <Button variant={"accent"}>Edit</Button>
            )}
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default AnnoncePage;