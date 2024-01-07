"use client";

import { AppDispatch, RootState } from "@/store";
import { MessageSquarePlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { useSubscriptionStore } from "@/Zustand/store";
import { Button } from "../ui/button";
import Snipper from "../Snipper";
import { v4 as uuidv4 } from "uuid";
import { finishLoading, startLoading } from "@/redux/stateSlice";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  addChatRef,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatMembers";
import { error } from "console";
import { ToastAction } from "../ui/toast";

export default function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  async function createNewChat() {
    if (!session?.user.id) return;
    dispatch(startLoading());
    toast({
      title: "Creating new chat...",
      description: "Hold tight while we create your new chat...",
      duration: 3000,
    });

    //Restricting the user
    const noOfChats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && noOfChats >= 3) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the limit of chats for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      dispatch(finishLoading());
      return;
    }

    const chatId = uuidv4(); // Random user id.
    // adding the doc to firestore database.

    await setDoc(addChatRef(chatId, session?.user.id!), {
      userId: session?.user.id!,
      email: session?.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session?.user.image! || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "There was an error creating your chat!",
          variant: "destructive",
        });
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  }

  if (isLarge)
    return (
      <div>
        <Button variant={"default"} onClick={createNewChat}>
          {isLoading ? <Snipper size={30} /> : "Create a New Chat"}
        </Button>
      </div>
    );

  return <MessageSquarePlusIcon onClick={createNewChat} />;
}
