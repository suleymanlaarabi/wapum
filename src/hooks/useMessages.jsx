import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  where,
} from "firebase/firestore";
import useRealtimeFirestore from "./useRealtimeFirestore";
import { db } from "../../firebase.config";
import useFirestore from "./useFirestore";
import useAuth from "./useAuth";

const useMessages = (conversationId) => {
  const { currentUser } = useAuth();
  const { documents, addDataToDocuments } = useRealtimeFirestore(
    "messages",

    query(
      collection(db, "messages"),
      where("conversationId", "==", conversationId),
      orderBy("timestamp", "desc"),
      limit(13)
    ),
    ["conversations", conversationId]
  );
  const { createDocument } = useFirestore("messages");
  const sendMessage = (message) => {
    addDataToDocuments([
      ...documents,
      {
        id: 11090110901,
        conversationId,
        message,
        sender: currentUser.email,
        timestamp: new Date(),
      },
    ]);
    createDocument({
      conversationId,
      message,
      sender: currentUser.email,
      timestamp: serverTimestamp(),
    });
  };
  const fetchNewMessages = async () => {
    const lastMessage = documents[documents.length - 1];
    console.log(lastMessage);
    const docs = await getDocs(
      query(
        collection(db, "messages"),
        where("conversationId", "==", conversationId),
        orderBy("timestamp", "desc"),
        startAfter(lastMessage.timestamp), // Utilise startAfter avec le dernier message de la première batch
        limit(13)
      )
    );
    await addDataToDocuments(
      docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  let newMessages = documents?.map((doc) => {
    if (doc.timestamp instanceof Date) {
      return doc;
    }
    return {
      ...doc,
      timestamp: doc.timestamp?.toDate(),
    };
  });
  const messages = newMessages
    ?.filter(
      (message, index, self) =>
        index === self.findIndex((m) => m.id === message.id)
    )
    .sort((a, b) => a.timestamp - b.timestamp);

  return { messages, sendMessage, fetchNewMessages };
};

export default useMessages;
