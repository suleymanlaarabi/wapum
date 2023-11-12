// import chakra components
import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Center,
  useColorModeValue,
  Button,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import DeleteModal from "../Modal/DeleteModal";
import useFirestore from "../../../hooks/useFirestore";
import useAuth from "../../../hooks/useAuth";
const AnnoceCard = ({ title, image, price, category, id, userId }) => {
  const { currentUser } = useAuth();

  const onConfirmDelete = () => {
    console.log("delete");
    deleteDocument(id);
  };
  const { Modal, onOpen } = useModal(DeleteModal, {
    title: "Delete Annonce",
    onConfirm: onConfirmDelete,
  });

  const { deleteDocument } = useFirestore("annonces");

  const privateButton = () => {
    if (currentUser) {
      if (currentUser.email === userId) {
        return (
          <IconButton
            onClick={onOpen}
            colorScheme="red"
            icon={<DeleteIcon />}
          />
        );
      }
    }
  };

  return (
    <>
      <Modal />
      <Center py={6}>
        <Box
          role={"group"}
          p={6}
          borderRadius={7}
          maxW={"320px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          textAlign={"center"}
        >
          <Box
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              style={{
                objectFit: "contain",
              }}
              src={image}
              alt="#"
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text color={"gray.500"} fontSize={"sm"}>
              {category}
            </Text>
            <Heading>{title}</Heading>
            <Stack direction={"row"} align={"center"}>
              <Text>${price}</Text>
            </Stack>
          </Stack>
          <Flex mt={4} gap={4} justifyContent={"center"}>
            <NavLink to={"/annonce/" + id}>
              <Button>Voir l{"'"}annonce</Button>
            </NavLink>
            {privateButton()}
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default AnnoceCard;
