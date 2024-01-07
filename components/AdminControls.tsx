import DeleteChatButton from "./Chat/DeleteChatButton";
import InviteUser from "./Chat/InviteUser";

export default function AdminControls({ chatId }: { chatId: string }) {
  return (
    <div className="flex justify-end space-x-2 m-5 mb-0">
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  );
}
