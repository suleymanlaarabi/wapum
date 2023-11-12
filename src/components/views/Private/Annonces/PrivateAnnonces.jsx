/* eslint-disable react-hooks/exhaustive-deps */
import { Heading, IconButton, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import useFirestore from "../../../../hooks/useFirestore";
import useAuth from "../../../../hooks/useAuth";
import AnnoceCard from "../../../common/Card/AnnoceCard";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../../../firebase.config";
const PrivateAnnonces = () => {
  const { currentUser } = useAuth();
  const { documents } = useFirestore(
    "annonces",

    query(collection(db, "annonces"), where("userId", "==", currentUser.email))
  );
  return (
    <>
      <Flex mt={12} align={"center"} gap={2} flexDirection={"column"}>
        <Heading fontSize={30}>My Annonces</Heading> <Flex></Flex>
        <Flex justifyContent={"center"} wrap={"wrap"} gap={6}>
          {documents.map((annonce, key) => {
            return (
              <AnnoceCard
                key={key}
                title={annonce.title}
                description={annonce.description}
                image={annonce.images[0]}
                price={annonce.price}
                id={annonce.id}
                userId={annonce.userId}
              />
            );
          })}
        </Flex>
        <IconButton
          w={140}
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
