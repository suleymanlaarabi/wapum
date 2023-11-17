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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { BiMessageDetail } from "react-icons/bi";

import useFirestore from "../../../hooks/useFirestore";
import useAuth from "../../../hooks/useAuth";

import { collection, doc, query, where } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { fetchProfileImageUrl } from "../../../utils/helpers/firebase.helper";
import { useNavigate } from "react-router-dom";
const AnnoncePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const { documents, isLoading } = useFirestore(
    "annonces",
    doc(db, "annonces", id),
    ["annonces", "getDefaultAnnonce", id]
  );
  const {
    documents: conversations,
    createDocument: createDocumentInConversations,
  } = currentUser
    ? useFirestore(
        "conversations",

        query(
          collection(db, "conversations"),
          where("participants", "array-contains", currentUser.email)
        ),
        ["conversations", currentUser.email]
      )
    : { documents: [], createDocument: () => {} };

  const {
    title,
    description,
    price,
    images,
    type,
    category,
    adress,
    city,
    zipCode,
  } = documents[0]
    ? documents[0]
    : {
        title: "",
        description: "",
        price: "",
        images: [],
      };

  const textColor = useColorModeValue("gray.900", "gray.50");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const onContactSeller = () => {
    let isAlreadyInConversation = conversations.find((conversation) =>
      conversation.participants.find(
        (participant) => participant === documents[0].userId
      )
    );
    if (isAlreadyInConversation) {
      navigate(`/private/messages/conversation/${isAlreadyInConversation.id}`);
    } else {
      fetchProfileImageUrl(documents[0].userId).then(async (url) => {
        await createDocumentInConversations({
          participants: [currentUser.email, documents[0].userId],
          profileURL: [currentUser.photoURL, url],
        });
        navigate(`/private/messages/conversation-list`);
      });
    }
  };

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
                  Category
                </Text>
                <Breadcrumb
                  spacing="8px"
                  separator={<ChevronRightIcon color="gray.500" />}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink>{category.toUpperCase()}</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <BreadcrumbLink>{type}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>

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
                <Text fontSize={"2xl"}>Adress: {adress}</Text>
                <Text fontSize={"2xl"}>City: {city}</Text>
                <Text fontSize={"2xl"}>Zip Code: {zipCode}</Text>
              </Box>
            </Stack>

            {currentUser && (
              <>
                {currentUser.email === documents[0].userId ? (
                  <Button variant={"accent"}>Edit</Button>
                ) : (
                  <Button onClick={onContactSeller} colorScheme="green" gap={3}>
                    Contact the seller <BiMessageDetail fontSize={20} />
                  </Button>
                )}
              </>
            )}
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default AnnoncePage;
