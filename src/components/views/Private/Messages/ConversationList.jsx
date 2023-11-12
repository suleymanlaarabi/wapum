import { Text, Flex, Button, Avatar } from "@chakra-ui/react";
import ConversationsNav from "../../../Navigation/Chat/ConversationsNav";
import useModal from "../../../../hooks/useModal";
import InputModal from "../../../common/Modal/InputModal";
import { NavLink } from "react-router-dom";
import { fetchProfileImageUrl } from "../../../../utils/helpers/firebase.helper";
import useFirestore from "../../../../hooks/useFirestore";
import useAuth from "../../../../hooks/useAuth";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../../../firebase.config";
import useRealtimeFirestore from "../../../../hooks/useRealtimeFirestore";

const ConversationList = () => {
  const { currentUser } = useAuth();
  const { documents } = useRealtimeFirestore(
    "conversations",

    query(
      collection(db, "conversations"),
      where("participants", "array-contains", currentUser.email)
    ),
    ["conversations", currentUser.email]
  );

  const { createDocument } = useFirestore("conversations");

  const onNewConversation = (name) => {
    fetchProfileImageUrl(name)
      .then((url) => {
        createDocument({
          participants: [currentUser.email, name],
          profileURL: [currentUser.photoURL, url],
        });
      })
      .catch((error) => {
        console.log(
          "Erreur lors de la récupération de l'URL de l'image de profil :",
          error
        );
      });
  };

  const { Modal, onOpen } = useModal(InputModal, {
    title: "New Conversation",
    onConfirm: onNewConversation,
    placeHolder: "Email",
  });

  return (
    <>
      <Modal />
      <Flex maxW={"full"} w="full" direction={"column"}>
        <ConversationsNav openModal={onOpen} />
        {documents?.map((conversation) => {
          const receiver = conversation.participants.find(
            (participant) => participant !== currentUser.email
          );
          const profileURL = conversation.profileURL.find(
            (url) => url !== currentUser.photoURL
          );
          return (
            <NavLink
              style={{
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
              key={conversation.id}
              to={`/private/messages/conversation/${conversation.id}}`}
            >
              <Button
                justifyContent={"space-around"}
                w={"full"}
                height={75}
                borderRadius={0}
              >
                <Avatar src={profileURL} />
                <Text
                  fontSize={{
                    base: "sm",
                    md: "25px",
                    lg: "40px",
                  }}
                  w={"80%"}
                >
                  {receiver}
                </Text>
              </Button>
            </NavLink>
          );
        })}
      </Flex>
    </>
  );
};

export default ConversationList;
