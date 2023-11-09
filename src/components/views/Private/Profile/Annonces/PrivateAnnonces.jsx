import { Heading, IconButton, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
const PrivateAnnonces = () => {
  return (
    <>
      <Flex gap={2} flexDirection={"column"}>
        <Heading fontSize={30}>My Annonces</Heading>{" "}
        <IconButton
          variant={"accent"}
          as={NavLink}
          to={"/private/annonces/create-annonces"}
          icon={<AddIcon />}
        />
      </Flex>
    </>
  );
};

export default PrivateAnnonces;
