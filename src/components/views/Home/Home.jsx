import { Heading, useColorModeValue, Flex, Input } from "@chakra-ui/react";
import useFirestore from "../../../hooks/useFirestore";
import AnnonceCard from "../../common/Card/AnnoceCard";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { collection, limit, query } from "firebase/firestore";
import { db } from "../../../../firebase.config";
const Home = () => {
  const { documents } = useFirestore(
    "annonces",
    query(collection(db, "annonces"), limit(15)),
    ["annonces", "getDefaultAnnonce"]
  );

  const [searchTerm, setSearchTerm] = useState("");

  const documentsFiltered = useCallback(() => {
    return documents.filter((annonce) => {
      return annonce.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [documents, searchTerm]);

  const [documentsFilteredState, setDocumentsFilteredState] = useState([]);

  useEffect(() => {
    if (documents.length > 0 && searchTerm.length > 0) {
      setDocumentsFilteredState(documentsFiltered());
    } else if (documents.length > 0 && searchTerm.length === 0) {
      setDocumentsFilteredState(documents);
    }
  }, [searchTerm, documents, documentsFiltered]);

  return (
    <>
      <Flex w={"full"} direction={"column"}>
        <Flex
          align={"center"}
          direction={"column"}
          height={110}
          w={"full"}
          gap={4}
        >
          <Input
            borderBottomLeftRadius={30}
            borderBottomRightRadius={30}
            w={"65%"}
            height={50}
            placeholder="Search"
            bg={useColorModeValue("gray.200", "gray.600")}
            fontSize={18}
            fontWeight={900}
            border={"none"}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Heading>Home</Heading>
        </Flex>
        <Flex gap={5} wrap={"wrap"} justify={"center"}>
          {documentsFilteredState.map((annonce, key) => {
            return (
              <AnnonceCard
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
      </Flex>
    </>
  );
};

export default Home;
