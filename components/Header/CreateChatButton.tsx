"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";

export default function CreateChatButton() {
  const router = useRouter();
  async function createNewChat() {
    router.push("/chat/abc");
  }

  return <MessageSquarePlusIcon onClick={createNewChat} />;
}
