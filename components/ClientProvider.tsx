"use client";
import { SessionProvider } from "next-auth/react";

//this component is used for OAuth with google and github session

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
