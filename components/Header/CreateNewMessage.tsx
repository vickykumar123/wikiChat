import { MessageSquareTextIcon } from "lucide-react";
import Link from "next/link";

export default function CreateNewMessage() {
  return (
    <Link href={"/chat"} prefetch={false}>
      <MessageSquareTextIcon className="text-black dark:text-white" />
    </Link>
  );
}
