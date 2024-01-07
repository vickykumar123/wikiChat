import { LanguagesSupported } from "@/Zustand/store";
import { db } from "@/firebase";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  query,
  limit,
  orderBy,
} from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface Message {
  id?: string;
  input: string;
  timestamp: Date;
  user: User;
  translated?: {
    [K in LanguagesSupported]?: string;
  };
}

const messageConverter: FirestoreDataConverter<Message> = {
  //pushing data to firestore
  toFirestore: function (message: Message): DocumentData {
    return {
      input: message.input,
      timestamp: message.timestamp,
      user: message.user,
    };
  },

  //pulling data from firestore
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      input: data.input,
      timestamp: data.timestamp?.toDate(),
      translated: data.translated,
      user: data.user,
    };
  },
};

export const messageRef = (chatId: string) =>
  collection(db, "chats", chatId, "messages").withConverter(messageConverter);

export const limitedMessagesRef = (chatId: string) =>
  query(messageRef(chatId), limit(25));

export const sortedMessagesRef = (chatId: string) =>
  query(messageRef(chatId), orderBy("timestamp", "asc"));

export const limitedSortedMessageRef = (chatId: string) =>
  query(query(messageRef(chatId), limit(1)), orderBy("timestamp", "desc"));
