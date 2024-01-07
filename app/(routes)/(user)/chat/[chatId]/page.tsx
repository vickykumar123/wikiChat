import { authOptions } from "@/auth";
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/Chat/ChatInput";
import ChatMemebersBadges from "@/components/Chat/ChatMemebersBadges";
import ChatMessages from "@/components/Chat/ChatMessages";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};

export default async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) redirect("/chat?error=permission");

  return (
    <>
      {/*Admin Controls  */}
      <AdminControls chatId={chatId} />
      {/* ChatMembersBadge */}
      <ChatMemebersBadges chatId={chatId} />
      {/* ChatMessages */}
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          initialMessages={initialMessages}
          session={session}
        />
      </div>
      {/* ChatInput */}
      <ChatInput chatId={chatId} />
    </>
  );
}
