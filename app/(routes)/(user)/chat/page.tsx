import ChatList from "@/components/Chat/ChatList";
import ChatPermissionError from "@/components/Chat/ChatPermissionError";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

//error coming from [chatid] page due to permission denied
export default function ChatsPage({ searchParams: { error } }: Props) {
  return (
    <div>
      {/* Chat permission chat */}
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}

      {/* ChatList */}
      <ChatList />
    </div>
  );
}
