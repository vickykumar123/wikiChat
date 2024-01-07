"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/Zustand/store";
import Snipper from "../Snipper";
import { StarIcon } from "lucide-react";
import ManageAccountButton from "../Pricing/ManageAccountButton";

export default function UserDropDown({ session }: { session: Session | null }) {
  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session) {
    return (
      <Button variant="outline" onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={session.user?.name} image={session.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subscription === undefined && (
          <DropdownMenuItem>
            <Snipper size={10} />
          </DropdownMenuItem>
        )}

        {subscription?.role === "pro" && (
          <>
            <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
              <StarIcon fill="#E935C1" />
              <p>PRO</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ManageAccountButton />
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
